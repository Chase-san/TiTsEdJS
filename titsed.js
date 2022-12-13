'use strict';

(async function() {
  // All of the TiTs game should be accessed via this variable
  // this is set in the loader interval at the bottom of the file
  var game_app = null;

  const titsed = async function() {
    /////////////////////////////////////////////////////////
    // CLASSES

    // contains a list of data objects for easier management of dynamic subsections
    class DataList {
      constructor() {
        this.list = [];
        this.table = null;
        this.source = null;
      }
      reset(value = 0) {
        this.list.length = 0;
        this.source = value;
      }
      update() {
        for (var i = 0; i < this.list.length; ++i) {
          if (!this.list[i].focus) {
            this.list[i].load();
          }
        }
      }
    }
    // points to game data and streamlines access to it
    class Data {
      constructor(obj, id, element) {
        this.obj = obj;
        this.id = id;

        this.focus_ = false;
        if (Array.isArray(element)) {
          for (var i = 0; i < element.length; ++i) {
            element[i].onfocus = this.onfocus.bind(this);
            element[i].onblur = this.onblur.bind(this);
          }
        } else {
          element.onfocus = this.onfocus.bind(this);
          element.onblur = this.onblur.bind(this);
        }
        this.element = element;
      }
      get value() {
        if (this.id in this.obj) {
          return this.obj[this.id];
        }
        alert(`${this.id} attribute not found.`);
        return null;
      }
      set value(value) {
        this.obj[this.id] = value;
      }
      get number() {
        return Number(this.value);
      }
      set number(value) {
        this.value = Number(value);
      }
      get focus() {
        return this.focus_;
      }
      onfocus() {
        this.focus_ = true;
      }
      onblur() {
        this.focus_ = false;
        this.save();
      }
      // default load/save functions
      load() {
        this.element.value = this.number;
      }
      save() {
        this.number = this.element.value;
      }
    }

    // points to game flag data and allows easier management of it
    class FlagData extends Data {
      constructor(obj, id, element) {
        super(obj, id, element);
      }
      get(index) {
        return this.value[index];
      }
      set(index, value) {
        this.value[index] = value;
      }
      load() {
        // create map
        const emap = {};
        var i = 0;
        for (i = 0; i < this.element.length; ++i) {
          const e = this.element[i];
          e.checked = false;
          emap[Number(e.value)] = e;
        }
        // load values
        for (i = 0; i < this.value.length; ++i) {
          const key = Number(this.value[i]);
          if (key in emap) {
            emap[key].checked = true;
          }
        }
      }
      save() {
        this.value.length = 0;
        for (var i = 0; i < this.element.length; ++i) {
          const e = this.element[i];
          if (e.checked) {
            this.value.push(Number(e.value));
          }
        }
      }
    }

    /////////////////////////////////////////////////////////
    // VARIABLES
    const version = 'v0.7';
    const id_prefix = 'titsed';
    const text_color = '#000';      // var(--textColor)
    const bg_color = '#EEE';        // var(--foregroundColorA)
    const border_color = '#000';    // var(--foregroundColorB)
    const input_color = '#FFF';     // var(--shadowColor)
    const hover_color = '#EEE';     // var(--shadowColor)
    const active_color = '#AAA';    // var(--shadowColor)
    const right_arrow = '&#9654;';  // used for show/hide button
    const left_arrow = '&#9664;';   // used for show/hide button
    const editor_width_px = 440;

    const main_data = new DataList();
    const breast_data = new DataList();
    const cock_data = new DataList();
    const vagina_data = new DataList();

    var current_data = main_data;
    var editor_shown = true;

    // creates a map of lists of valid values for the dropdowns and flags
    const VALID = (function() {
      // this function assumes unique string values
      function sortKeysByValue(name_list) {
        const keys = Object.keys(name_list);
        const inverse = {};
        var output = [];
        var values = [];
        var i = 0;
        for (i = 0; i < keys.length; ++i) {
          const key = keys[i];
          const value = name_list[key];
          values.push(value);
          inverse[value] = Number(key);
        }
        values.sort();
        for (i = 0; i < values.length; ++i) {
          output.push(inverse[values[i]]);
        }
        return output;
      }
      function matchRefOrder(input, ref) {
        // if we have anything left over, pin it to the end
        const inref = input.slice();
        const output = [];
        for (var i = 0; i < ref.length; ++i) {
          const value = ref[i];
          const index = inref.indexOf(value);
          if (index !== -1) {
            output.push(value);
            inref.splice(index, 1);
          }
        }
        inref.forEach((e) => output.push(e));
        return output;
      }
      function unique(input) {
        const output = [];
        input.forEach((e) => {
          if (output.indexOf(e) === -1) {
            output.push(e);
          }
        });
        return output;
      }

      const sorted_type_names = sortKeysByValue(game_app.GLOBAL.TYPE_NAMES);

      /* The ones built into TiTs are not accurate for some reason. */
      /* Flags */
      const valid_ass_flags = [3, 11, 30, 37, 40, 41, 47, 51];
      const valid_areola_flags = [40, 52, 53, 54];
      const valid_arm_flags = [1, 3, 4, 6, 12, 13, 19, 20, 21, 22, 23, 34, 35, 37, 38, 48];
      const valid_cock_flags = [2, 3, 6, 7, 8, 9, 10, 11, 12, 19, 21, 25, 26, 28, 29, 30, 31, 33, 36, 37, 44, 48];
      const valid_crotch_flags = [57, 58];
      const valid_ear_flags = [1, 7, 20, 21, 34, 49, 50];
      const valid_face_flags = [1, 6, 14, 15, 20, 21, 34, 35, 43, 46];
      const valid_leg_flags = [1, 2, 3, 4, 6, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 34, 35, 37, 48];
      const valid_skin_flags = [3, 4, 5, 6, 11, 12, 13, 19, 20, 21, 34, 35, 37, 39, 46, 48];
      const valid_tail_flags = [1, 2, 4, 6, 7, 8, 9, 12, 13, 20, 21, 25, 26, 27, 28, 29, 30, 33, 34, 35, 42, 44, 49];
      const valid_tongue_flags = [1, 2, 3, 5, 7, 11, 12, 30, 32, 37];
      const valid_vagina_flags = [3, 11, 18, 25, 30, 33, 37, 40, 41, 44, 45, 47, 51];

      /* Types */
      const valid_antenna_types = [0, 6, 16, 43, 60, 64, 81];
      const valid_arm_types = [
        0,  1,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 14, 15, 16, 19, 20, 23, 24, 26, 28, 40,
        45, 46, 49, 51, 52, 53, 55, 57, 60, 65, 66, 69, 67, 75, 77, 81, 82, 88, 89, 90, 93,
      ];
      const valid_cock_types = [
        0,  1,  3,  4,  5,  6,  9,  10, 11, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 29, 34, 42, 43, 46,
        50, 51, 52, 53, 54, 55, 56, 57, 60, 61, 64, 65, 66, 69, 70, 72, 78, 79, 81, 82, 85, 88, 90, 93,
      ];
      const valid_ear_types = [
        0,  1,  2,  3,  4,  5,  8,  9,  10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 24, 26, 29, 40, 42, 45,
        46, 49, 50, 51, 52, 53, 57, 58, 59, 65, 66, 71, 72, 73, 75, 76, 77, 81, 82, 88, 89, 90, 93,
      ];
      const valid_eye_types = [
        0, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 42, 49, 50, 51, 53, 54, 55, 60, 65, 66, 69, 71, 76, 80, 81, 82, 85, 87, 88, 93,
      ];
      const valid_face_types = [
        0,  1,  2,  3,  4,  5,  7,  9,  10, 11, 12, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27,
        39, 40, 42, 45, 50, 52, 57, 66, 69, 71, 72, 75, 76, 77, 81, 82, 87, 88, 89, 90, 93,
      ];
      const valid_horn_types = [0, 2, 11, 12, 15, 21, 30, 50, 62, 63, 65, 76, 82, 87, 88, 90];
      const valid_leg_types = [
        0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 23, 24, 26, 28, 32, 35, 40,
        42, 45, 46, 49, 50, 51, 52, 53, 55, 56, 57, 60, 64, 65, 66, 69, 72, 75, 76, 77, 81, 82, 85, 88, 89, 90, 91, 93,
      ];
      const valid_tail_types = [
        0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 23, 24, 26, 29, 33,
        40, 42, 43, 45, 46, 49, 51, 52, 53, 54, 57, 60, 65, 66, 69, 72, 75, 76, 77, 82, 87, 88, 89, 91, 93,
      ];
      const valid_tongue_types = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 23, 40, 42, 45, 49, 57, 65, 66, 69, 81, 82, 88];
      const valid_vagina_types = [0, 1, 3, 4, 5, 6, 7, 10, 13, 16, 18, 19, 20, 21, 24, 44, 46, 49, 51, 55, 56, 65, 66, 67, 69, 72, 74, 82, 88];
      const valid_wing_types = [0, 6, 10, 11, 15, 19, 23, 28, 31, 36, 37, 38, 54, 58, 59, 60, 65, 81, 82, 85];

      /* Update our valid types with whatever the game also thinks is valid. In case we go awhile without updating. */
      return {
        FLAGS: {
          ASS: valid_ass_flags,
          AREOLA: unique(valid_areola_flags.concat(game_app.GLOBAL.VALID_AREOLA_FLAGS)),
          ARM: unique(valid_arm_flags.concat(game_app.GLOBAL.VALID_ARM_FLAGS)),
          COCK: unique(valid_cock_flags.concat(game_app.GLOBAL.VALID_COCK_FLAGS)),
          CROTCH: valid_crotch_flags,
          EAR: valid_ear_flags,
          FACE: unique(valid_face_flags.concat(game_app.GLOBAL.VALID_FACE_FLAGS)),
          LEG: unique(valid_leg_flags.concat(game_app.GLOBAL.VALID_LEG_FLAGS)),
          SKIN: unique(valid_skin_flags.concat(game_app.GLOBAL.VALID_SKIN_FLAGS)),
          TAIL: unique(valid_tail_flags.concat(game_app.GLOBAL.VALID_TAIL_FLAGS)),
          TONGUE: unique(valid_tongue_flags.concat(game_app.GLOBAL.VALID_TONGUE_FLAGS)),
          VAGINA: unique(valid_vagina_flags.concat(game_app.GLOBAL.VALID_VAGINA_FLAGS)),
        },
        TYPES: {
          ANTENNA: matchRefOrder(unique(valid_antenna_types.concat(game_app.GLOBAL.VALID_ANTENNAE_TYPES)), sorted_type_names),
          ARM: matchRefOrder(unique(valid_arm_types.concat(game_app.GLOBAL.VALID_ARM_TYPES)), sorted_type_names),
          COCK: matchRefOrder(unique(valid_cock_types.concat(game_app.GLOBAL.VALID_COCK_TYPES)), sorted_type_names),
          EAR: matchRefOrder(unique(valid_ear_types.concat(game_app.GLOBAL.VALID_EAR_TYPES)), sorted_type_names),
          EYE: matchRefOrder(unique(valid_eye_types.concat(game_app.GLOBAL.VALID_EYE_TYPES)), sorted_type_names),
          FACE: matchRefOrder(unique(valid_face_types.concat(game_app.GLOBAL.VALID_FACE_TYPES)), sorted_type_names),
          HORN: matchRefOrder(unique(valid_horn_types.concat(game_app.GLOBAL.VALID_HORN_TYPES)), sorted_type_names),
          LEG: matchRefOrder(unique(valid_leg_types.concat(game_app.GLOBAL.VALID_LEG_TYPES)), sorted_type_names),
          TAIL: matchRefOrder(unique(valid_tail_types.concat(game_app.GLOBAL.VALID_TAIL_TYPES)), sorted_type_names),
          TONGUE: matchRefOrder(unique(valid_tongue_types.concat(game_app.GLOBAL.VALID_TONGUE_TYPES)), sorted_type_names),
          VAGINA: matchRefOrder(unique(valid_vagina_types.concat(game_app.GLOBAL.VALID_VAGINA_TYPES)), sorted_type_names),
          WING: matchRefOrder(unique(valid_wing_types.concat(game_app.GLOBAL.VALID_WING_TYPES)), sorted_type_names),
        },
      };
    })();

    /////////////////////////////////////////////////////////
    // UI FUNCTIONS

    // not perfectly in order just yet
    function getById(id) {
      return document.getElementById(id);
    }

    function createHeader(text, hideElement = null) {
      const header = document.createElement('h4');
      header.textContent = text;

      if (hideElement) {
        const button = document.createElement('button');
        button.textContent = 'Hide';
        let hideFn;
        let showFn;
        hideFn = function() {
          button.textContent = 'Show';
          button.onclick = showFn;
          hideElement.className = 'hidden';
        };
        showFn = function() {
          button.textContent = 'Hide';
          button.onclick = hideFn;
          hideElement.className = '';
        };
        button.onclick = hideFn;
        header.appendChild(button);
      }

      return header;
    }

    function createSeperator() {
      return document.createElement('hr');
    }

    function createTable() {
      return document.createElement('table');
    }

    function createTableRow(items, type = 'td', total_rows = 3) {
      const row = document.createElement('tr');
      for (var i = 0; i < items.length; ++i) {
        const col = document.createElement(type);
        // check if last item
        if (i == items.length - 1) {
          col.colSpan = total_rows - i;
        }
        col.appendChild(items[i]);
        row.appendChild(col);
      }
      return row;
    }

    function createHeaderRow(text) {
      const label = document.createTextNode(text);
      return createTableRow([label], 'th');
    }

    function createBooleanControlRow(name, obj, id) {
      const label = document.createTextNode(name);
      const e = document.createElement('input');
      e.type = 'checkbox';
      const data = new Data(obj, id, e);

      // it's a number
      data.load = function() {
        this.element.checked = !!this.value;
      };
      data.save = function() {
        if (this.element.checked) {
          this.value = 1;
        } else {
          this.value = 0;
        }
      };

      current_data.list.push(data);
      return createTableRow([label, e]);
    }

    function createButtonRow(name, clickfn) {
      const button = document.createElement('button');
      button.innerText = name;
      button.onclick = clickfn;
      return createTableRow([button]);
    }

    function createNumberControlRow(name, obj, id) {
      const label = document.createTextNode(name);
      const e = document.createElement('input');
      e.type = 'number';
      current_data.list.push(new Data(obj, id, e));
      return createTableRow([label, e]);
    }

    function createNumberControlRow2(name, obj, id0, id1) {
      const label = document.createTextNode(name);
      const e0 = document.createElement('input');
      e0.type = 'number';
      current_data.list.push(new Data(obj, id0, e0));
      const e1 = document.createElement('input');
      e1.type = 'number';
      current_data.list.push(new Data(obj, id1, e1));
      return createTableRow([label, e0, e1]);
    }

    function createTextControlRow(name, obj, id) {
      const label = document.createTextNode(name);
      const e = document.createElement('input');
      e.type = 'text';
      const data = new Data(obj, id, e);
      data.load = function() {
        this.element.value = this.value;
      };
      data.save = function() {
        this.value = this.element.value;
      };
      current_data.list.push(data);
      return createTableRow([label, e]);
    }

    function createComboControlRow(name, obj, id, name_list, keys = null) {
      const label = document.createTextNode(name);
      // create combo list for name_list
      if (keys == null) {
        keys = Object.keys(name_list);
      }
      const select = document.createElement('select');
      for (var i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = name_list[key];
        const option = new Option(value, key);
        select.appendChild(option);
      }
      current_data.list.push(new Data(obj, id, select));
      return createTableRow([label, select]);
    }

    function createFlagRow(name, obj, id, ui_id, name_list, keys = null) {
      // this flag item is unique, it's very complex, and requires all items in
      // the key list to be displayed as check boxes, meaning another table
      const flag_table_cols = 2;
      const label = document.createTextNode(name);
      const table = createTable();
      table.className = `${id_prefix}_flags`;
      if (keys == null) {
        keys = Object.keys(name_list);
      }
      const elements = [];
      var buffer = [];
      for (var i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = name_list[key];
        const entry_id = `${id_prefix}_${ui_id}_${i}`;

        const div = document.createElement('div');
        const entry_input = document.createElement('input');
        entry_input.id = entry_id;
        entry_input.type = 'checkbox';
        entry_input.value = key;
        elements.push(entry_input);
        div.appendChild(entry_input);

        const entry_label = document.createElement('label');
        entry_label.htmlFor = entry_id;
        entry_label.innerText = value;
        div.appendChild(entry_label);

        buffer.push(div);
        if (buffer.length == 2) {
          table.appendChild(createTableRow([buffer[0], buffer[1]], 'td', flag_table_cols));
          buffer = [];
        }
      }
      if (buffer.length == 1) {
        table.appendChild(createTableRow([buffer[0]], 'td', flag_table_cols));
        buffer = [];
      }
      current_data.list.push(new FlagData(obj, id, elements));
      return createTableRow([label, table]);
    }

    /////////////////////////////////////////////////////////
    // SECTION UI FUNCTIONS (for the editor tables)
    function buildAssTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow2('Hip Size', game_app.pc, 'hipRatingRaw', 'hipRatingMod'));
      table.appendChild(createNumberControlRow2('Butt Size', game_app.pc, 'buttRatingRaw', 'buttRatingMod'));
      table.appendChild(createBooleanControlRow('Anal Virgin', game_app.pc, 'analVirgin'));
      table.appendChild(createNumberControlRow('Anal Capacity', game_app.pc.ass, 'bonusCapacity'));
      table.appendChild(createNumberControlRow2('Anal Looseness', game_app.pc.ass, 'loosenessRaw', 'loosenessMod'));
      table.appendChild(createNumberControlRow2('Anal Wetness', game_app.pc.ass, 'wetnessRaw', 'wetnessMod'));
      table.appendChild(createFlagRow('Flags', game_app.pc.ass, 'flags', 'ass_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.ASS));
      return table;
    }

    function buildBodyTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow('Height', game_app.pc, 'tallness'));
      table.appendChild(createNumberControlRow('Tone', game_app.pc, 'tone'));
      table.appendChild(createNumberControlRow('Thickness', game_app.pc, 'thickness'));
      table.appendChild(createNumberControlRow2('Belly', game_app.pc, 'bellyRatingRaw', 'bellyRatingMod'));
      table.appendChild(createComboControlRow('Skin Type', game_app.pc, 'skinType', game_app.GLOBAL.SKIN_TYPE_NAMES));
      table.appendChild(createFlagRow('Skin Flags', game_app.pc, 'skinFlags', 'skin_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.SKIN));
      table.appendChild(createTextControlRow('Skin Tone', game_app.pc, 'skinTone'));
      table.appendChild(createTextControlRow('Skin Accent', game_app.pc, 'skinAccent'));
      table.appendChild(createTextControlRow('Fur Color', game_app.pc, 'furColor'));
      table.appendChild(createTextControlRow('Scale Color', game_app.pc, 'scaleColor'));
      table.appendChild(createComboControlRow('Arm Type', game_app.pc, 'armType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.ARM));
      table.appendChild(createFlagRow('Arm Flags', game_app.pc, 'armFlags', 'arm_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.ARM));
      table.appendChild(createNumberControlRow('Leg Count', game_app.pc, 'legCount'));
      table.appendChild(createComboControlRow('Leg Type', game_app.pc, 'legType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.LEG));
      table.appendChild(createFlagRow('Leg Flags', game_app.pc, 'legFlags', 'leg_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.LEG));
      table.appendChild(createNumberControlRow('Wing Count', game_app.pc, 'wingCount'));
      table.appendChild(createComboControlRow('Wing Type', game_app.pc, 'wingType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.WING));
      return table;
    }

    function removeBreastRowFunc(index) {
      return function() {
        console.log('Removing breast row #' + index);
        game_app.pc.removeBreastRow(index);
        repopulateBreastsTable();
      };
    }

    function repopulateBreastsTable() {
      // TODO convert this into it's own data type
      const table = breast_data.table;
      breast_data.reset(game_app.pc.breastRows.length);
      current_data = breast_data;
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

      for (var i = 0; i < game_app.pc.breastRows.length; ++i) {
        table.appendChild(createHeaderRow(`Breast Row ${i}`));
        if (game_app.pc.breastRows.length > 1) {
          table.appendChild(createButtonRow('Remove', removeBreastRowFunc(i)));
        }
        table.appendChild(createNumberControlRow('Count', game_app.pc.breastRows[i], 'breasts'));
        table.appendChild(createNumberControlRow2('Rating', game_app.pc.breastRows[i], 'breastRatingRaw', 'breastRatingMod'));
        table.appendChild(createNumberControlRow('Lactation', game_app.pc.breastRows[i], 'breastRatingLactationMod'));
        table.appendChild(createNumberControlRow('Honeypot', game_app.pc.breastRows[i], 'breastRatingHoneypotMod'));
        table.appendChild(createNumberControlRow('Fullness', game_app.pc.breastRows[i], 'fullness'));
        table.appendChild(createComboControlRow('Nipple', game_app.pc.breastRows[i], 'nippleType', game_app.GLOBAL.NIPPLE_TYPE_NAMES));
        table.appendChild(
            createFlagRow('Areola Flags', game_app.pc.breastRows[i], 'areolaFlags', `br${i}_areola_flag`, game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.AREOLA));
        // TODO piercing
      }
      table.appendChild(createButtonRow('Add', function() {
        game_app.pc.createBreastRow();
        repopulateBreastsTable();
      }));
      current_data = main_data;
    }

    function buildBreastsTable() {
      breast_data.table = createTable();
      repopulateBreastsTable();
      return breast_data.table;
    }

    function buildCheatTable() {
      const table = createTable();
      if (!('CHEATS_ENABLED' in game_app.flags)) {
        game_app.flags['CHEATS_ENABLED'] = 0;
      }
      table.appendChild(createBooleanControlRow('Enabled', game_app.flags, 'CHEATS_ENABLED'));
      table.appendChild(createButtonRow('Show Cheat Menu', function() {
        game_app.ui.state.optionMode = 5;  // this might break later
        game_app.ui.showOptions();
        toggleEditor();
      }));
      return table;
    }

    function removeCockFunc(index) {
      return function() {
        game_app.pc.removeCock(index);
        repopulateCockTable();
      };
    }

    function buildCockEntry(table, base, flag_prefix) {
      table.appendChild(createComboControlRow('Type', base, 'cType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.COCK));
      table.appendChild(createTextControlRow('Color', base, 'cockColor'));
      table.appendChild(createNumberControlRow2('Length', base, 'cLengthRaw', 'cLengthMod'));
      table.appendChild(createNumberControlRow2('Thickness Ratio', base, 'cThicknessRatioRaw', 'cThicknessRatioMod'));
      table.appendChild(createNumberControlRow('Flaccid Multiplier', base, 'flaccidMultiplier'));
      table.appendChild(createNumberControlRow('Knot Multiplier', base, 'knotMultiplier'));
      table.appendChild(createFlagRow('Flags', base, 'flags', flag_prefix + '_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.COCK));
      table.appendChild(createBooleanControlRow('Virgin', base, 'virgin'));
      // TODO cocksock
      // TODO piercing
    }

    function repopulateCockTable() {
      // TODO convert this into it's own data type
      const table = cock_data.table;
      cock_data.reset(game_app.pc.cocks.length);
      current_data = cock_data;
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

      for (var i = 0; i < game_app.pc.cocks.length; ++i) {
        table.appendChild(createHeaderRow(`Cock ${i}`));
        table.appendChild(createButtonRow('Remove', removeCockFunc(i)));
        buildCockEntry(table, game_app.pc.cocks[i], `c${i}`);
      }
      table.appendChild(createButtonRow('Add', function() {
        game_app.pc.createCock();
        repopulateCockTable();
      }));
      current_data = main_data;
    }

    function buildCockTable() {
      cock_data.table = createTable();
      repopulateCockTable();
      return cock_data.table;
    }

    function buildFaceTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow('Femininity', game_app.pc, 'femininity'));
      table.appendChild(createComboControlRow('Face Type', game_app.pc, 'faceType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.FACE));
      table.appendChild(createFlagRow('Face Flags', game_app.pc, 'faceFlags', 'face_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.FACE));
      table.appendChild(createComboControlRow('Eye Type', game_app.pc, 'eyeType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.EYE));
      table.appendChild(createTextControlRow('Eye Color', game_app.pc, 'eyeColor'));
      table.appendChild(createNumberControlRow('Lip Size', game_app.pc, 'lipMod'));
      table.appendChild(createTextControlRow('Lip Color', game_app.pc, 'lipColor'));
      table.appendChild(createComboControlRow('Tongue Type', game_app.pc, 'tongueType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.TONGUE));
      table.appendChild(createFlagRow('Tongue Flags', game_app.pc, 'tongueFlags', 'tongue_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.TONGUE));
      // TODO beardColor
      // TODO beardLength
      // TODO beardStyle
      // TODO beardType
      return table;
    }

    function buildGenitalTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow('Elasticity', game_app.pc, 'elasticity'));
      table.appendChild(createComboControlRow('Genital Spot', game_app.pc, 'genitalSpot', game_app.GLOBAL.GENITAL_SPOT_NAMES));
      table.appendChild(createFlagRow('Crotch Flags', game_app.pc, 'crotchFlags', 'crotch_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.CROTCH));
      table.appendChild(createBooleanControlRow('Cock Virgin', game_app.pc, 'cockVirgin'));
      table.appendChild(createBooleanControlRow('Vagina Virgin', game_app.pc, 'vaginalVirgin'));

      table.appendChild(createNumberControlRow('Balls', game_app.pc, 'balls'));
      table.appendChild(createNumberControlRow('Ball Size', game_app.pc, 'ballSizeRaw', 'ballSizeMod'));
      table.appendChild(createNumberControlRow('Ball Fullness', game_app.pc, 'ballFullness'));
      table.appendChild(createNumberControlRow('Ball Efficiency', game_app.pc, 'ballEfficiency'));
      table.appendChild(createNumberControlRow('Refractory Rate', game_app.pc, 'refractoryRate'));
      table.appendChild(createComboControlRow('Cum Type', game_app.pc, 'cumType', game_app.GLOBAL.FLUID_TYPE_NAMES));
      table.appendChild(createNumberControlRow2('Cum Multiplier', game_app.pc, 'cumMultiplierRaw', 'cumMultiplierMod'));
      table.appendChild(createNumberControlRow2('Cum Quality', game_app.pc, 'cumQualityRaw', 'cumQualityMod'));

      table.appendChild(createComboControlRow('GCum Type', game_app.pc, 'girlCumType', game_app.GLOBAL.FLUID_TYPE_NAMES));
      table.appendChild(createNumberControlRow2('GCum Multiplier', game_app.pc, 'girlCumMultiplierRaw', 'girlCumMultiplierMod'));
      return table;
    }

    function buildHeadTable() {
      const table = createTable();
      table.appendChild(createComboControlRow('Hair Type', game_app.pc, 'hairType', game_app.GLOBAL.HAIR_TYPE_NAMES));
      table.appendChild(createTextControlRow('Hair Color', game_app.pc, 'hairColor'));
      table.appendChild(createNumberControlRow('Hair Length', game_app.pc, 'hairLength'));
      // TODO hairStyle
      table.appendChild(createComboControlRow('Ear Type', game_app.pc, 'earType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.EAR));
      table.appendChild(createNumberControlRow('Ear Length', game_app.pc, 'earLength'));
      table.appendChild(createFlagRow('Ear Flags', game_app.pc, 'earFlags', 'ear_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.EAR));
      table.appendChild(createNumberControlRow('Antennae Count', game_app.pc, 'antennae'));
      table.appendChild(createComboControlRow('Antennae Type', game_app.pc, 'antennaeType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.ANTENNA));
      table.appendChild(createNumberControlRow('Horn Count', game_app.pc, 'horns'));
      table.appendChild(createComboControlRow('Horn Type', game_app.pc, 'hornType', game_app.GLOBAL.TYPE_NAMES));
      table.appendChild(createNumberControlRow('Horn Length', game_app.pc, 'hornLength'));
      table.appendChild(createBooleanControlRow('Gills', game_app.pc, 'gills'));
      return table;
    }

    function buildMilkTable() {
      const table = createTable();
      table.appendChild(createComboControlRow('Type', game_app.pc, 'milkType', game_app.GLOBAL.FLUID_TYPE_NAMES));
      table.appendChild(createNumberControlRow('Fullness', game_app.pc, 'milkFullness'));
      table.appendChild(createNumberControlRow('Rate', game_app.pc, 'milkRate'));
      table.appendChild(createNumberControlRow('Multiplier', game_app.pc, 'milkMultiplier'));
      table.appendChild(createNumberControlRow('Storage Multiplier', game_app.pc, 'milkStorageMultiplier'));
      return table;
    }

    function buildNippleTable() {
      const table = createTable();
      table.appendChild(createTextControlRow('Color', game_app.pc, 'nippleColor'));
      table.appendChild(createNumberControlRow('Length Ratio', game_app.pc, 'nippleLengthRatio'));
      table.appendChild(createNumberControlRow('Width Ratio', game_app.pc, 'nippleWidthRatio'));
      table.appendChild(createNumberControlRow('Per Breast', game_app.pc, 'nipplesPerBreast'));
      table.appendChild(
          createComboControlRow('DickN Type', game_app.pc, 'dickNippleType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.COCK));  // TODO probably wrong
      table.appendChild(createNumberControlRow('DickN Multiplier', game_app.pc, 'dickNippleMultiplier'));
      return table;
    }

    function buildPregnancyTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow2('Multiplier', game_app.pc, 'pregnancyMultiplierRaw', 'pregnancyMultiplierMod'));
      table.appendChild(createNumberControlRow2('Multiplier', game_app.pc, 'pregnancyMultiplierRaw', 'pregnancyMultiplierMod'));
      table.appendChild(createHeaderRow('Incubation Bonus'));
      table.appendChild(createNumberControlRow2('Father', game_app.pc, 'pregnancyIncubationBonusFatherRaw', 'pregnancyIncubationBonusFatherMod'));
      table.appendChild(createNumberControlRow2('Mother', game_app.pc, 'pregnancyIncubationBonusMotherRaw', 'pregnancyIncubationBonusMotherMod'));
      // TODO pc.pregnancyData
      return table;
    }

    function buildProfileTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow('Credits', game_app.pc, 'credits'));
      table.appendChild(createNumberControlRow('Personality', game_app.pc, 'personality'));
      table.appendChild(createNumberControlRow('Exhibitionism', game_app.pc, 'exhibitionismRaw'));
      return table;
    }

    function buildStatsTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow('Shields', game_app.pc, 'shieldsRaw'));
      table.appendChild(createNumberControlRow('Health', game_app.pc, 'HPRaw'));
      table.appendChild(createNumberControlRow('Lust', game_app.pc, 'lustRaw'));
      table.appendChild(createNumberControlRow('Energy', game_app.pc, 'energyRaw'));
      table.appendChild(createNumberControlRow2('Physique', game_app.pc, 'physiqueRaw', 'physiqueMod'));
      table.appendChild(createNumberControlRow2('Reflexes', game_app.pc, 'reflexesRaw', 'reflexesMod'));
      table.appendChild(createNumberControlRow2('Aim', game_app.pc, 'aimRaw', 'aimMod'));
      table.appendChild(createNumberControlRow2('Intelligence', game_app.pc, 'intelligenceRaw', 'intelligenceMod'));
      table.appendChild(createNumberControlRow2('Willpower', game_app.pc, 'willpowerRaw', 'willpowerMod'));
      table.appendChild(createNumberControlRow2('Libido', game_app.pc, 'libidoRaw', 'libidoMod'));
      table.appendChild(createNumberControlRow2('Taint', game_app.pc, 'taintRaw', 'taintMod'));
      table.appendChild(createNumberControlRow('Tease Lvl', game_app.pc, 'teaseLevel'));
      table.appendChild(createNumberControlRow('Tease Exp', game_app.pc, 'teaseXP'));
      return table;
    }

    function buildTailTable() {
      const table = createTable();
      table.appendChild(createNumberControlRow('Count', game_app.pc, 'tailCount'));
      table.appendChild(createComboControlRow('Type', game_app.pc, 'tailType', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.TAIL));
      table.appendChild(createComboControlRow('Cum Type', game_app.pc, 'tailCumType', game_app.GLOBAL.FLUID_TYPE_NAMES));
      table.appendChild(createComboControlRow('GCum Type', game_app.pc, 'tailGirlCumType', game_app.GLOBAL.FLUID_TYPE_NAMES));
      // tailVenom
      // tailRecharge
      table.appendChild(createFlagRow('Flags', game_app.pc, 'tailFlags', `tail_flag`, game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.TAIL));
      table.appendChild(createHeaderRow('Cock'));
      buildCockEntry(table, game_app.pc.tailCock, 'tail_');
      table.appendChild(createHeaderRow('Vagina'));
      buildVaginaEntry(table, game_app.pc.tailCunt, 'tail_');

      return table;
    }

    function removeVaginaFunc(index) {
      return function() {
        game_app.pc.removeVagina(index);
        repopulateVaginaTable();
      };
    }

    function buildVaginaEntry(table, base, flag_prefix) {
      table.appendChild(createComboControlRow('Type', base, 'type', game_app.GLOBAL.TYPE_NAMES, VALID.TYPES.VAGINA));
      table.appendChild(createTextControlRow('Color', base, 'vaginaColor'));
      table.appendChild(createNumberControlRow('Clits', base, 'clits'));
      table.appendChild(createNumberControlRow('Fullness', base, 'fullness'));
      table.appendChild(createNumberControlRow('Shrinks', base, 'shrinkCounter'));
      table.appendChild(createBooleanControlRow('Hymen', base, 'hymen'));
      table.appendChild(createNumberControlRow('Capacity', base, 'bonusCapacity'));
      table.appendChild(createNumberControlRow2('Looseness', base, 'loosenessRaw', 'loosenessMod'));
      table.appendChild(createNumberControlRow('Min Looseness', base, 'minLooseness'));
      table.appendChild(createNumberControlRow2('Wetness', base, 'wetnessRaw', 'wetnessMod'));
      table.appendChild(createFlagRow('Flags', base, 'flags', flag_prefix + '_flag', game_app.GLOBAL.FLAG_NAMES, VALID.FLAGS.VAGINA));
      // piercing: null,
      // clitPiercing: null,
    }

    function repopulateVaginaTable() {
      const table = vagina_data.table;
      vagina_data.reset(game_app.pc.vaginas.length);
      current_data = vagina_data;
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

      table.appendChild(createNumberControlRow('Clit Length', game_app.pc, 'clitLength'));
      table.appendChild(createNumberControlRow2('Fertility', game_app.pc, 'fertilityRaw', 'fertilityMod'));
      // TODO convert this into it's own data type/creater
      for (var i = 0; i < game_app.pc.vaginas.length; ++i) {
        table.appendChild(createHeaderRow(`Vagina ${i}`));
        table.appendChild(createButtonRow('Remove', removeVaginaFunc(i)));
        buildVaginaEntry(table, game_app.pc.vaginas[i], `v${i}`);
      }
      table.appendChild(createButtonRow('Add', function() {
        game_app.pc.createVagina();
        repopulateVaginaTable();
      }));
      current_data = main_data;
    }

    function buildVaginaTable() {
      vagina_data.table = createTable();
      repopulateVaginaTable();
      return vagina_data.table;
    }

    /////////////////////////////////////////////////////////
    // SPECIAL UI FUNCTIONS
    function createEditorStyle() {
      const style = document.createElement('style');
      style.textContent = `
      #${id_prefix} {
        width: ${editor_width_px}px;
        height: 100%;
        background: ${bg_color};
        color: ${text_color};
        border: 1px solid ${border_color};
        padding: 1ex;
        position: fixed;
        box-sizing: border-box;
        right: 0px;
      }
      #${id_prefix} .hidden {
        display: none;
      }
      #${id_prefix} > #${id_prefix}_data {
        overflow-y: scroll;
        overflow-x: hidden;
        height: calc(100% - 80px);
        scrollbar-width: auto;
        scrollbar-color: auto;
      }
      #${id_prefix} > h3 {
        margin: 1ex;
        text-align: center;
      }
      #${id_prefix} button {
        color: ${text_color};
        background-color: ${input_color};
        border: 1px solid ${border_color};
      }
      #${id_prefix} button:hover {
        background-color: ${hover_color};
      }
      #${id_prefix} button:active {
        background-color: ${active_color};
      }
      #${id_prefix} > div > h4 > button {
        float: right;
        margin-right: 1em;
      }
      #${id_prefix} table {
        width: calc(100% - 2ex);
      }
      #${id_prefix} table td {
        white-space: nowrap;
        padding-right: 1ex;
      }
      #${id_prefix} div > table td:first-child {
        width: 120px; /* looks less dumb */
      }
      #${id_prefix} table input,
      #${id_prefix} table button,
      #${id_prefix} table select {
        width: 100%;
        color: ${text_color};
        background-color: ${input_color};
        border: 1px solid ${border_color};
      }
      #${id_prefix} input[type=number] {
        appearance: textfield;
      }
      #${id_prefix} hr {
        border: 1px solid ${text_color};
      }
      #${id_prefix} table input[type="checkbox"] {
        width: auto; /* left align */
        margin-right: 1ex; /* checkbox are nicer */
      }
      #${id_prefix}_show_hide {
        background: ${bg_color};
        color: ${text_color};
        border: 1px solid ${border_color};
        width: 20px;
        height: 60px;
        position: absolute;
        right: calc(0px + ${editor_width_px}px);
      }`;
      document.head.appendChild(style);
    }

    var toggleEditor = function() {};

    function createEditorApp() {
      const editor_app = document.createElement('div');
      editor_app.id = id_prefix;

      // Show/Hide button
      const show_hide_button = document.createElement('button');
      show_hide_button.id = `${id_prefix}_show_hide`;
      show_hide_button.innerHTML = `${right_arrow}`;  // right_arrow is a const, so this should be fine
      toggleEditor = function() {
        if (editor_shown) {
          show_hide_button.innerHTML = `${left_arrow}`;  // left_arrow is a const, so this should be fine
          editor_shown = false;
          editor_app.style = `right: -${editor_width_px}px`;
        } else {
          show_hide_button.innerHTML = `${right_arrow}`;  // right_arrow is a const, so this should be fine
          editor_shown = true;
          editor_app.style = '';
        }
      };
      show_hide_button.onclick = toggleEditor;
      editor_app.appendChild(show_hide_button);

      // Title
      const editor_title = document.createElement('h3');
      const editor_link = document.createElement('a');
      editor_link.textContent = `TiTsEdJS ${version}`;
      editor_link.href = 'https://github.com/Chase-san/TiTsEdJS';
      editor_title.appendChild(editor_link);
      editor_app.appendChild(editor_title);

      // main body
      const editor_body = document.createElement('div');
      editor_body.id = `${id_prefix}_data`;
      const warning_p = document.createElement('p');
      warning_p.textContent = 'You must load a save first.';
      editor_body.appendChild(warning_p);
      editor_app.appendChild(editor_body);

      document.body.appendChild(editor_app);
    }

    function buildUI() {
      const controls = getById(`${id_prefix}_data`);

      main_data.reset(game_app.pc);

      current_data = main_data;

      // remove all child nodes
      while (controls.firstChild) {
        controls.removeChild(controls.firstChild);
      }
      controls.appendChild(createHeader('Cheats'));
      controls.appendChild(buildCheatTable());

      {
        controls.appendChild(createSeperator());
        const table = buildStatsTable();
        controls.appendChild(createHeader('Stats', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildProfileTable();
        controls.appendChild(createHeader('Profile', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildHeadTable();
        controls.appendChild(createHeader('Head', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildFaceTable();
        controls.appendChild(createHeader('Face', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildBodyTable();
        controls.appendChild(createHeader('Body', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildTailTable();
        controls.appendChild(createHeader('Tail', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildBreastsTable();
        controls.appendChild(createHeader('Breasts', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildNippleTable();
        controls.appendChild(createHeader('Nipple', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildMilkTable();
        controls.appendChild(createHeader('Milk', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildGenitalTable();
        controls.appendChild(createHeader('Genitals'), table);
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildCockTable();
        controls.appendChild(createHeader('Cock', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildVaginaTable();
        controls.appendChild(createHeader('Vagina', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildPregnancyTable();
        controls.appendChild(createHeader('Pregnancy', table));
        controls.appendChild(table);
      }
      {
        controls.appendChild(createSeperator());
        const table = buildAssTable();
        controls.appendChild(createHeader('Ass', table));
        controls.appendChild(table);
      }
    }

    // This is our 'main' function
    (function() {
      createEditorStyle();
      createEditorApp();
      setInterval(function() {
        // setup initial load/reload
        if (main_data.source === null || main_data.source !== game_app.pc) {
          if (typeof game_app.pc !== 'undefined') {
            buildUI();
          }
          return;
        }
        // update our fancy tables
        if (game_app.pc.breastRows.length !== breast_data.source) {
          repopulateBreastsTable();
        } else {
          breast_data.update();
        }
        if (game_app.pc.cocks.length !== cock_data.source) {
          repopulateCockTable();
        } else {
          cock_data.update();
        }
        if (game_app.pc.vaginas.length !== vagina_data.source) {
          repopulateVaginaTable();
        } else {
          vagina_data.update();
        }
        main_data.update();
      }, 1000);  // 1 second timer
    })();
  };

  // attempt to load titsed every second then stop
  console.log('TiTsEdJS Loading');
  const titsed_loader_id = setInterval(function() {
    console.log('Attempting to load TiTsEdJS...');
    // running via injection/embedding
    if (window.GLOBAL != null) {
      game_app = window;
    }
    // running via extension (firefox)
    if (window.wrappedJSObject != null && window.wrappedJSObject.GLOBAL != null) {
      game_app = window.wrappedJSObject;
    }
    // not running at all
    if (game_app === null) {
      return;
    }
    if (game_app.titsed) {
      console.log('TiTsEdJS is already loaded, please reload the page.');
      clearInterval(titsed_loader_id);
      return;
    }
    game_app['titsed'] = true;
    titsed();
    console.log('TiTsEdJS Ready');
    clearInterval(titsed_loader_id);
  }, 1000);
})();

"use strict";

(async function () {
  //setup all basic UI elements
  const version = "v0.3";
  const id_prefix = "titsed";
  const fg_color = "#000";
  const bg_color = "#f4f4f4";
  const right_arrow = "&#9654;";
  const left_arrow = "&#9664;";
  const editor_width = 420;

  function createValidityLists() {
    //this function assumes unique string values
    function sortKeysByValue(name_list) {
      const keys = Object.keys(name_list);
      const inverse = {};
      var output = [];
      var values = [];
      for (var i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = name_list[key];
        values.push(value);
        inverse[value] = Number(key);
      }
      values.sort();
      for (var i = 0; i < values.length; ++i) {
        output.push(inverse[values[i]]);
      }
      return output;
    }
    function matchRefOrder(input, ref) {
      //if we have anything left over, pin it to the end
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

    const sorted_type_names = sortKeysByValue(GLOBAL.TYPE_NAMES);

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
    const valid_tongue_flags = [1, 2, 3, 5, 7, 11, 12, 30, 32, 37];
    const valid_vagina_flags = [3, 11, 18, 25, 30, 33, 37, 40, 41, 44, 45, 47, 51];

    /* Types */
    const valid_antenna_types = [0, 6, 16, 43, 60, 64, 81];
    const valid_arm_types = [
      0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 19, 20, 23, 24, 26, 28, 40, 45, 46, 49, 51, 52, 53, 55, 57, 60, 65, 66, 69, 67, 75, 77, 81, 82, 88, 89,
      90, 93,
    ];
    const valid_cock_types = [
      0, 1, 3, 4, 5, 6, 9, 10, 11, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 29, 34, 42, 43, 46, 50, 51, 52, 53, 54, 55, 56, 57, 60, 61, 64, 65, 66, 69, 70,
      72, 78, 79, 81, 82, 85, 88, 90, 93,
    ];
    const valid_ear_types = [
      0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 24, 26, 29, 40, 42, 45, 46, 49, 50, 51, 52, 53, 57, 58, 59, 65, 66, 71, 72, 73, 75, 76,
      77, 81, 82, 88, 89, 90, 93,
    ];
    const valid_eye_types = [
      0, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 42, 49, 50, 51, 53, 54, 55, 60, 65, 66, 69, 71, 76, 80, 81, 82, 85, 87, 88, 93,
    ];
    const valid_face_types = [
      0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 39, 40, 42, 45, 50, 52, 57, 66, 69, 71, 72, 75, 76, 77, 81, 82, 87, 88, 89,
      90, 93,
    ];
    const valid_horn_types = [0, 2, 11, 12, 15, 21, 30, 50, 62, 63, 65, 76, 82, 87, 88, 90];
    const valid_leg_types = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 23, 24, 26, 28, 32, 35, 40, 42, 45, 46, 49, 50, 51, 52, 53, 55, 56, 57, 60, 64,
      65, 66, 69, 72, 75, 76, 77, 81, 82, 85, 88, 89, 90, 91, 93,
    ];
    const valid_tail_types = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 23, 24, 26, 29, 33, 40, 42, 43, 45, 46, 49, 51, 52, 53, 54, 57, 60, 65, 66, 69, 72,
      75, 76, 77, 82, 87, 88, 89, 91, 93,
    ];
    const valid_tongue_types = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 23, 40, 42, 45, 49, 57, 65, 66, 69, 81, 82, 88];
    const valid_vagina_types = [0, 1, 3, 4, 5, 6, 7, 10, 13, 16, 18, 19, 20, 21, 24, 44, 46, 49, 51, 55, 56, 65, 66, 67, 69, 72, 74, 82, 88];
    const valid_wing_types = [0, 6, 10, 11, 15, 19, 23, 28, 31, 36, 37, 38, 54, 58, 59, 60, 65, 81, 82, 85];

    /* Update our valid types with whatever the game also thinks is valid. In case we go awhile without updating. */
    return {
      FLAGS: {
        ASS: valid_ass_flags,
        AREOLA: unique(valid_areola_flags, GLOBAL.VALID_AREOLA_FLAGS),
        ARM: unique(valid_arm_flags, GLOBAL.VALID_ARM_FLAGS),
        COCK: unique(valid_cock_flags, GLOBAL.VALID_COCK_FLAGS),
        CROTCH: valid_crotch_flags,
        EAR: valid_ear_flags,
        FACE: unique(valid_face_flags, GLOBAL.VALID_FACE_FLAGS),
        LEG: unique(valid_leg_flags, GLOBAL.VALID_LEG_FLAGS),
        SKIN: unique(valid_skin_flags, GLOBAL.VALID_SKIN_FLAGS),
        TONGUE: unique(valid_tongue_flags, GLOBAL.VALID_TONGUE_FLAGS),
        VAGINA: unique(valid_vagina_flags, GLOBAL.VALID_VAGINA_FLAGS),
      },
      TYPES: {
        ANTENNA: matchRefOrder(unique(valid_antenna_types.concat(GLOBAL.VALID_ANTENNAE_TYPES)), sorted_type_names),
        ARM: matchRefOrder(unique(valid_arm_types.concat(GLOBAL.VALID_ARM_TYPES)), sorted_type_names),
        COCK: matchRefOrder(unique(valid_cock_types.concat(GLOBAL.VALID_COCK_TYPES)), sorted_type_names),
        EAR: matchRefOrder(unique(valid_ear_types.concat(GLOBAL.VALID_EAR_TYPES)), sorted_type_names),
        EYE: matchRefOrder(unique(valid_eye_types.concat(GLOBAL.VALID_EYE_TYPES)), sorted_type_names),
        FACE: matchRefOrder(unique(valid_face_types.concat(GLOBAL.VALID_FACE_TYPES)), sorted_type_names),
        HORN: matchRefOrder(unique(valid_horn_types.concat(GLOBAL.VALID_HORN_TYPES)), sorted_type_names),
        LEG: matchRefOrder(unique(valid_leg_types.concat(GLOBAL.VALID_LEG_TYPES)), sorted_type_names),
        TAIL: matchRefOrder(unique(valid_tail_types.concat(GLOBAL.VALID_TAIL_TYPES)), sorted_type_names),
        TONGUE: matchRefOrder(unique(valid_tongue_types.concat(GLOBAL.VALID_TONGUE_TYPES)), sorted_type_names),
        VAGINA: matchRefOrder(unique(valid_vagina_types.concat(GLOBAL.VALID_VAGINA_TYPES)), sorted_type_names),
        WING: matchRefOrder(unique(valid_wing_types.concat(GLOBAL.VALID_WING_TYPES)), sorted_type_names),
      },
    };
  }

  const VALID = createValidityLists();

  const style = document.createElement("style");
  style.innerHTML = `
  #${id_prefix} {
    width: ${editor_width}px;
    height: 100%;
    background: ${bg_color};
    color: ${fg_color};
    border: 1px solid ${fg_color};
    padding: 1ex;
    position: fixed;
    box-sizing: border-box;
    right: 0px;
  }
  #${id_prefix} > #${id_prefix}_data {
    overflow-y: scroll;
    height: calc(100% - 80px);
    scrollbar-width: auto;
    scrollbar-color: auto;
  }
  #${id_prefix} > h3 {
    margin: 1ex;
    text-align: center;
  }
  #${id_prefix} table {
    width: calc(100% - 2ex);
  }
  #${id_prefix} table td {
    white-space: nowrap;
  }
  #${id_prefix} div > table td:first-child {
    width: 120px; /* looks less dumb */
  }
  #${id_prefix} table input,
  #${id_prefix} table button,
  #${id_prefix} table select {
    width: 100%;
  }
  #${id_prefix} table input[type="checkbox"] {
    width: auto; /* left align */
  }
  #${id_prefix}_show_hide {
    border: 1px solid ${fg_color};
    width: 20px;
    height: 60px;
    position: absolute;
    right: calc(0px + ${editor_width}px);
  }`;
  document.head.appendChild(style);

  const app = document.createElement("div");
  app.id = id_prefix;
  app.innerHTML = `
  <button id="${id_prefix}_show_hide">${right_arrow}</button>
  <h3>TiTsEdJS ${version}</h3>
  <table><tr>
    <td><button id="${id_prefix}_load">Load</button></td>
    <td><button id="${id_prefix}_save">Save</button></td>
  </tr></table>
  <div id="${id_prefix}_data"><p>You must load a save before loading.</p></div>`;
  document.body.appendChild(app);

  function getById(id) {
    return document.getElementById(id);
  }

  const load_button = getById(`${id_prefix}_load`);
  const save_button = getById(`${id_prefix}_save`);

  var editor_shown = true;
  const show_hide_button = getById(`${id_prefix}_show_hide`);
  show_hide_button.onclick = function () {
    if (editor_shown) {
      show_hide_button.innerHTML = left_arrow;
      editor_shown = false;
      //do hide
      app.style = `right: -${editor_width}px`;
    } else {
      show_hide_button.innerHTML = right_arrow;
      editor_shown = true;
      //do show
      app.style = "";
    }
  };

  /**
   * This class is for accessing the data more easily.
   */
  class Data {
    /**
     * @param {object} obj
     * @param {string} id
     */
    constructor(obj, id, element) {
      this.obj = obj;
      this.id = id;
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
    //default load/save functions
    load() {
      this.element.value = this.number;
    }
    save() {
      this.number = this.element.value;
    }
  }

  /**
   * This class is used for array data such as flags.
   */
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
    push(value) {
      this.value[index].push(value);
    }

    load() {
      //create map
      const emap = {};
      for (var i = 0; i < this.element.length; ++i) {
        const e = this.element[i];
        e.checked = false;
        emap[Number(e.value)] = e;
      }
      //load values
      for (var i = 0; i < this.value.length; ++i) {
        const key = Number(this.value[i]);
        if (key in emap) {
          emap[key].checked = true;
        }
      }
    }
    save() {
      const result = [];
      for (var i = 0; i < this.element.length; ++i) {
        const e = this.element[i];
        if (e.checked) {
          result.push(Number(e.value));
        }
      }
      this.value = result;
    }
  }

  const data_list = []; //for all the data values we will have
  function do_load() {
    for (var i = 0; i < data_list.length; ++i) {
      data_list[i].load();
    }
  }
  function do_save() {
    for (var i = 0; i < data_list.length; ++i) {
      data_list[i].save();
    }
  }

  function createHeader(text) {
    const header = document.createElement("h4");
    header.innerHTML = text;
    return header;
  }

  function createTable() {
    return document.createElement("table");
  }

  function createTableRow(items, type = "td", total_rows = 3) {
    const row = document.createElement("tr");
    for (var i = 0; i < items.length; ++i) {
      const col = document.createElement(type);
      //check if last item
      if (i == items.length - 1) {
        col.colSpan = total_rows - i;
      }
      col.appendChild(items[i]);
      row.appendChild(col);
    }
    return row;
  }

  function createTextRow(text) {
    const label = document.createTextNode(text);
    return createTableRow([label]);
  }

  function createHeaderRow(text) {
    const label = document.createTextNode(text);
    return createTableRow([label], "th");
  }

  function createBooleanControlRow(name, obj, id, is_bool = true) {
    const label = document.createTextNode(name);
    const e = document.createElement("input");
    e.type = "checkbox";
    const data = new Data(obj, id, e);
    if (is_bool === "bool") {
      data.load = function () {
        this.element.checked = this.value;
      };
      data.save = function () {
        this.value = this.element.checked;
      };
    } else {
      //then it's a number
      data.load = function () {
        this.element.checked = !!this.value;
      };
      data.save = function () {
        if (this.element.checked) {
          this.value = 1;
        } else {
          this.value = 0;
        }
      };
    }

    data_list.push(data);
    return createTableRow([label, e]);
  }

  function createNumberControlRow(name, obj, id) {
    const label = document.createTextNode(name);
    const e = document.createElement("input");
    e.type = "number";
    data_list.push(new Data(obj, id, e));
    return createTableRow([label, e]);
  }

  function createNumberControlRow2(name, obj, id0, id1) {
    const label = document.createTextNode(name);
    const e0 = document.createElement("input");
    e0.type = "number";
    data_list.push(new Data(obj, id0, e0));
    const e1 = document.createElement("input");
    e1.type = "number";
    data_list.push(new Data(obj, id1, e1));
    return createTableRow([label, e0, e1]);
  }

  function createTextControlRow(name, obj, id) {
    const label = document.createTextNode(name);
    const e = document.createElement("input");
    e.type = "text";
    const data = new Data(obj, id, e);
    data.load = function () {
      this.element.value = this.value;
    };
    data.save = function () {
      this.value = this.element.value;
    };
    data_list.push(data);
    return createTableRow([label, e]);
  }

  function createComboControlRow(name, obj, id, name_list, keys = null) {
    const label = document.createTextNode(name);
    //create combo list for name_list
    if (keys == null) {
      keys = Object.keys(name_list);
    }
    const select = document.createElement("select");
    for (var i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const value = name_list[key];
      const option = new Option(value, key);
      select.appendChild(option);
    }
    data_list.push(new Data(obj, id, select));
    return createTableRow([label, select]);
  }

  function createFlagRow(name, obj, id, ui_id, name_list, keys = null) {
    //this flag item is unique, it's very complex, and requires all items in
    //the key list to be displayed as check boxes, meaning another table
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

      const div = document.createElement("div");
      const entry_input = document.createElement("input");
      entry_input.id = entry_id;
      entry_input.type = "checkbox";
      entry_input.value = key;
      elements.push(entry_input);
      div.appendChild(entry_input);

      const entry_label = document.createElement("label");
      entry_label.htmlFor = entry_id;
      entry_label.innerText = value;
      div.appendChild(entry_label);

      buffer.push(div);
      if (buffer.length == 2) {
        table.appendChild(createTableRow([buffer[0], buffer[1]], "td", flag_table_cols));
        buffer = [];
      }
    }
    if (buffer.length == 1) {
      table.appendChild(createTableRow([buffer[0]], "td", flag_table_cols));
      buffer = [];
    }
    data_list.push(new FlagData(obj, id, elements));
    return createTableRow([label, table]);
  }

  function createButtonRow(name, clickfn) {
    const button = document.createElement("button");
    button.innerText = name;
    button.onclick = clickfn;
    return createTableRow([button]);
  }

  function buildAssTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow2("Hip Size", pc, "hipRatingRaw", "hipRatingMod"));
    table.appendChild(createNumberControlRow2("Butt Size", pc, "buttRatingRaw", "buttRatingMod"));
    table.appendChild(createBooleanControlRow("Anal Virgin", pc, "analVirgin"));
    table.appendChild(createNumberControlRow("Anal Capacity", pc.ass, "bonusCapacity"));
    table.appendChild(createNumberControlRow2("Anal Looseness", pc.ass, "loosenessRaw", "loosenessMod"));
    table.appendChild(createNumberControlRow2("Anal Wetness", pc.ass, "wetnessRaw", "wetnessMod"));
    table.appendChild(createFlagRow("Flags", pc.ass, "flags", "ass_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.ASS));
    return table;
  }

  function buildBodyTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow("Tone", pc, "tone"));
    table.appendChild(createNumberControlRow("Thickness", pc, "thickness"));
    table.appendChild(createNumberControlRow2("Belly", pc, "bellyRatingRaw", "bellyRatingMod"));
    table.appendChild(createComboControlRow("Skin Type", pc, "skinType", GLOBAL.SKIN_TYPE_NAMES));
    table.appendChild(createFlagRow("Skin Flags", pc, "skinFlags", "skin_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.SKIN));
    table.appendChild(createTextControlRow("Skin Tone", pc, "skinTone"));
    table.appendChild(createTextControlRow("Skin Accent", pc, "skinAccent"));
    table.appendChild(createTextControlRow("Fur Color", pc, "furColor"));
    table.appendChild(createTextControlRow("Scale Color", pc, "scaleColor"));
    table.appendChild(createComboControlRow("Arm Type", pc, "armType", GLOBAL.TYPE_NAMES, VALID.TYPES.ARM));
    table.appendChild(createFlagRow("Arm Flags", pc, "armFlags", "arm_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.ARM));
    table.appendChild(createNumberControlRow("Leg Count", pc, "legCount"));
    table.appendChild(createComboControlRow("Leg Type", pc, "legType", GLOBAL.TYPE_NAMES, VALID.TYPES.LEG));
    table.appendChild(createFlagRow("Leg Flags", pc, "legFlags", "leg_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.LEG));
    table.appendChild(createNumberControlRow("Wing Count", pc, "wingCount"));
    table.appendChild(createComboControlRow("Wing Type", pc, "wingType", GLOBAL.TYPE_NAMES, VALID.TYPES.WING));
    return table;
  }

  function buildBreastsTable() {
    const table = createTable();
    //TODO convert this into it's own data type
    table.appendChild(createTextRow("Add/Remove (TODO)"));
    for (var i = 0; i < pc.breastRows.length; ++i) {
      table.appendChild(createHeaderRow(`Breast Row ${i}`));
      table.appendChild(createNumberControlRow("Count", pc.breastRows[i], "breasts"));
      table.appendChild(createNumberControlRow2("Rating", pc.breastRows[i], "breastRatingRaw", "breastRatingMod"));
      table.appendChild(createNumberControlRow("Lactation", pc.breastRows[i], "breastRatingLactationMod"));
      table.appendChild(createNumberControlRow("Honeypot", pc.breastRows[i], "breastRatingHoneypotMod"));
      table.appendChild(createNumberControlRow("Fullness", pc.breastRows[i], "fullness"));
      table.appendChild(createComboControlRow("Nipple", pc.breastRows[i], "nippleType", GLOBAL.NIPPLE_TYPE_NAMES));
      table.appendChild(createFlagRow("Areola Flags", pc.breastRows[i], "areolaFlags", `br${i}_areola_flag`, GLOBAL.FLAG_NAMES, VALID.FLAGS.AREOLA));
    }
    return table;
  }

  function buildCheatTable() {
    const table = createTable();
    if (!("CHEATS_ENABLED" in flags)) {
      flags["CHEATS_ENABLED"] = 0;
    }
    table.appendChild(createBooleanControlRow("Enabled", flags, "CHEATS_ENABLED"));
    // if (!('CHEATS_USED' in flags)) {
    //   flags['CHEATS_USED'] = 0;
    // }
    // table.appendChild(createNumberControlRow('Used', flags, 'CHEATS_USED'));
    return table;
  }

  function buildCockTable() {
    const table = createTable();
    //TODO convert this into it's own data type
    table.appendChild(createTextRow("Add/Remove (TODO)"));
    for (var i = 0; i < pc.cocks.length; ++i) {
      table.appendChild(createHeaderRow(`Cock ${i}`));
      table.appendChild(createComboControlRow("Type", pc.cocks[i], "cType", GLOBAL.TYPE_NAMES, VALID.TYPES.COCK));
      table.appendChild(createTextControlRow("Color", pc.cocks[i], "cockColor"));
      table.appendChild(createNumberControlRow2("Length", pc.cocks[i], "cLengthRaw", "cLengthMod"));
      table.appendChild(createNumberControlRow2("Thickness Ratio", pc.cocks[i], "cThicknessRatioRaw", "cThicknessRatioMod"));
      table.appendChild(createNumberControlRow("Flaccid Multiplier", pc.cocks[i], "flaccidMultiplier"));
      table.appendChild(createNumberControlRow("Knot Multiplier", pc.cocks[i], "knotMultiplier"));
      table.appendChild(createFlagRow("Flags", pc.cocks[i], "flags", `c${i}_flag`, GLOBAL.FLAG_NAMES, VALID.FLAGS.COCK));
      table.appendChild(createBooleanControlRow("Virgin", pc.cocks[i], "virgin"));
      // cocksock: null,
      // piercing: null,
    }
    return table;
  }

  function buildFaceTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow("Femininity", pc, "femininity"));
    table.appendChild(createComboControlRow("Face Type", pc, "faceType", GLOBAL.TYPE_NAMES, VALID.TYPES.FACE));
    table.appendChild(createFlagRow("Face Flags", pc, "faceFlags", "face_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.FACE));
    table.appendChild(createComboControlRow("Eye Type", pc, "eyeType", GLOBAL.TYPE_NAMES, VALID.TYPES.EYE));
    table.appendChild(createTextControlRow("Eye Color", pc, "eyeColor"));
    table.appendChild(createNumberControlRow("Lip Size", pc, "lipMod"));
    table.appendChild(createTextControlRow("Lip Color", pc, "lipColor"));
    table.appendChild(createComboControlRow("Tongue Type", pc, "tongueType", GLOBAL.TYPE_NAMES, VALID.TYPES.TONGUE));
    table.appendChild(createFlagRow("Tongue Flags", pc, "tongueFlags", "tongue_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.TONGUE));
    return table;
  }

  function buildGenitalTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow("Elasticity", pc, "elasticity"));
    table.appendChild(createComboControlRow("Genital Spot", pc, "genitalSpot", GLOBAL.GENITAL_SPOT_NAMES));
    table.appendChild(createFlagRow("Crotch Flags", pc, "crotchFlags", "crotch_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.CROTCH));
    table.appendChild(createBooleanControlRow("Cock Virgin", pc, "cockVirgin"));
    table.appendChild(createBooleanControlRow("Vagina Virgin", pc, "vaginalVirgin"));

    table.appendChild(createNumberControlRow("Balls", pc, "balls"));
    table.appendChild(createNumberControlRow("Ball Size", pc, "ballSizeRaw", "ballSizeMod"));
    table.appendChild(createNumberControlRow("Ball Fullness", pc, "ballFullness"));
    table.appendChild(createNumberControlRow("Ball Efficiency", pc, "ballEfficiency"));
    table.appendChild(createNumberControlRow("Refractory Rate", pc, "refractoryRate"));
    table.appendChild(createComboControlRow("Cum Type", pc, "cumType", GLOBAL.FLUID_TYPE_NAMES));
    table.appendChild(createNumberControlRow2("Cum Multiplier", pc, "cumMultiplierRaw", "cumMultiplierMod"));
    table.appendChild(createNumberControlRow2("Cum Quality", pc, "cumQualityRaw", "cumQualityMod"));

    table.appendChild(createComboControlRow("GCum Type", pc, "girlCumType", GLOBAL.FLUID_TYPE_NAMES));
    table.appendChild(createNumberControlRow2("GCum Multiplier", pc, "girlCumMultiplierRaw", "girlCumMultiplierMod"));
    return table;
  }

  function buildHeadTable() {
    const table = createTable();
    table.appendChild(createComboControlRow("Hair Type", pc, "hairType", GLOBAL.HAIR_TYPE_NAMES));
    table.appendChild(createTextControlRow("Hair Color", pc, "hairColor"));
    table.appendChild(createNumberControlRow("Hair Length", pc, "hairLength"));
    table.appendChild(createComboControlRow("Ear Type", pc, "earType", GLOBAL.TYPE_NAMES, VALID.TYPES.EAR));
    table.appendChild(createNumberControlRow("Ear Length", pc, "earLength"));
    table.appendChild(createFlagRow("Ear Flags", pc, "earFlags", "ear_flag", GLOBAL.FLAG_NAMES, VALID.FLAGS.EAR));
    table.appendChild(createNumberControlRow("Antennae Count", pc, "antennae"));
    table.appendChild(createComboControlRow("Antennae Type", pc, "antennaeType", GLOBAL.TYPE_NAMES, VALID.TYPES.ANTENNA));
    table.appendChild(createNumberControlRow("Horn Count", pc, "horns"));
    table.appendChild(createComboControlRow("Horn Type", pc, "hornType", GLOBAL.TYPE_NAMES));
    table.appendChild(createNumberControlRow("Horn Length", pc, "hornLength"));
    table.appendChild(createBooleanControlRow("Gills", pc, "gills"));
    return table;
  }

  function buildMilkTable() {
    const table = createTable();
    table.appendChild(createComboControlRow("Type", pc, "milkType", GLOBAL.FLUID_TYPE_NAMES));
    table.appendChild(createNumberControlRow("Fullness", pc, "milkFullness"));
    table.appendChild(createNumberControlRow("Rate", pc, "milkRate"));
    table.appendChild(createNumberControlRow("Multiplier", pc, "milkMultiplier"));
    table.appendChild(createNumberControlRow("Storage Multiplier", pc, "milkStorageMultiplier"));
    return table;
  }

  function buildNippleTable() {
    const table = createTable();
    table.appendChild(createTextControlRow("Color", pc, "nippleColor"));
    table.appendChild(createNumberControlRow("Length Ratio", pc, "nippleLengthRatio"));
    table.appendChild(createNumberControlRow("Width Ratio", pc, "nippleWidthRatio"));
    table.appendChild(createNumberControlRow("Per Breast", pc, "nipplesPerBreast"));
    table.appendChild(createComboControlRow("DickN Type", pc, "dickNippleType", GLOBAL.TYPE_NAMES, VALID.TYPES.COCK)); //TODO probably wrong
    table.appendChild(createNumberControlRow("DickN Multiplier", pc, "dickNippleMultiplier"));
    return table;
  }

  function buildProfileTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow("Credits", pc, "credits"));
    table.appendChild(createNumberControlRow("Height", pc, "tallness"));
    table.appendChild(createNumberControlRow("Personality", pc, "personality"));
    table.appendChild(createNumberControlRow("Exhibitionism", pc, "exhibitionismRaw"));
    return table;
  }

  function buildStatsTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow("Shields", pc, "shieldsRaw"));
    table.appendChild(createNumberControlRow("Health", pc, "HPRaw"));
    table.appendChild(createNumberControlRow("Lust", pc, "lustRaw"));
    table.appendChild(createNumberControlRow("Energy", pc, "energyRaw"));
    table.appendChild(createNumberControlRow2("Physique", pc, "physiqueRaw", "physiqueMod"));
    table.appendChild(createNumberControlRow2("Reflexes", pc, "reflexesRaw", "reflexesMod"));
    table.appendChild(createNumberControlRow2("Aim", pc, "aimRaw", "aimMod"));
    table.appendChild(createNumberControlRow2("Intelligence", pc, "intelligenceRaw", "intelligenceMod"));
    table.appendChild(createNumberControlRow2("Willpower", pc, "willpowerRaw", "willpowerMod"));
    table.appendChild(createNumberControlRow2("Libido", pc, "libidoRaw", "libidoMod"));
    table.appendChild(createNumberControlRow2("Taint", pc, "taintRaw", "taintMod"));
    return table;
  }

  function buildTailTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow("Count", pc, "tailCount"));
    table.appendChild(createComboControlRow("Type", pc, "tailType", GLOBAL.TYPE_NAMES, VALID.TYPES.TAIL));
    table.appendChild(createComboControlRow("Cum Type", pc, "tailCumType", GLOBAL.FLUID_TYPE_NAMES));
    table.appendChild(createComboControlRow("GCum Type", pc, "tailGirlCumType", GLOBAL.FLUID_TYPE_NAMES));
    // tailVenom
    // tailRecharge
    // tailFlags
    // tailCunt //obj
    // tailCock //obj
    return table;
  }

  function buildVaginaTable() {
    const table = createTable();
    table.appendChild(createNumberControlRow("Clit Length", pc, "clitLength"));
    table.appendChild(createNumberControlRow2("Fertility", pc, "fertilityRaw", "fertilityMod"));
    //TODO convert this into it's own data type/creater
    table.appendChild(createTextRow("Add/Remove (TODO)"));
    for (var i = 0; i < pc.vaginas.length; ++i) {
      table.appendChild(createHeaderRow(`Vagina ${i}`));
      table.appendChild(createComboControlRow("Type", pc.vaginas[i], "type", GLOBAL.TYPE_NAMES, VALID.TYPES.VAGINA));
      table.appendChild(createTextControlRow("Color", pc.vaginas[i], "vaginaColor"));
      table.appendChild(createNumberControlRow("Clits", pc.vaginas[i], "clits"));
      table.appendChild(createNumberControlRow("Fullness", pc.vaginas[i], "fullness"));
      table.appendChild(createNumberControlRow("Shrinks", pc.vaginas[i], "shrinkCounter"));
      table.appendChild(createBooleanControlRow("Hymen", pc.vaginas[i], "hymen"));
      table.appendChild(createNumberControlRow("Capacity", pc.vaginas[i], "bonusCapacity"));
      table.appendChild(createNumberControlRow2("Looseness", pc.vaginas[i], "loosenessRaw", "loosenessMod"));
      table.appendChild(createNumberControlRow("Min Looseness", pc.vaginas[i], "minLooseness"));
      table.appendChild(createNumberControlRow2("Wetness", pc.vaginas[i], "wetnessRaw", "wetnessMod"));
      table.appendChild(createFlagRow("Flags", pc.vaginas[i], "flags", `v${i}_flag`, GLOBAL.FLAG_NAMES, VALID.FLAGS.VAGINA));
      // piercing: null,
      // clitPiercing: null,
    }
    return table;
  }

  function buildUI() {
    const controls = getById(`${id_prefix}_data`);
    controls.innerHTML = "";
    controls.appendChild(createHeader("Cheats"));
    controls.appendChild(buildCheatTable());

    controls.appendChild(createHeader("Stats"));
    controls.appendChild(buildStatsTable());

    controls.appendChild(createHeader("Profile"));
    controls.appendChild(buildProfileTable());

    controls.appendChild(createHeader("Head"));
    controls.appendChild(buildHeadTable());

    controls.appendChild(createHeader("Face"));
    controls.appendChild(buildFaceTable());

    controls.appendChild(createHeader("Body"));
    controls.appendChild(buildBodyTable());

    controls.appendChild(createHeader("Tail"));
    controls.appendChild(buildTailTable());

    controls.appendChild(createHeader("Breasts"));
    controls.appendChild(buildBreastsTable());

    controls.appendChild(createHeader("Nipple"));
    controls.appendChild(buildNippleTable());

    controls.appendChild(createHeader("Milk"));
    controls.appendChild(buildMilkTable());

    controls.appendChild(createHeader("Genitals"));
    controls.appendChild(buildGenitalTable());

    controls.appendChild(createHeader("Cock"));
    controls.appendChild(buildCockTable());

    controls.appendChild(createHeader("Vagina"));
    controls.appendChild(buildVaginaTable());

    controls.appendChild(createHeader("Ass"));
    controls.appendChild(buildAssTable());
  }

  //setup load/save
  load_button.onclick = function () {
    if (typeof pc !== "undefined") {
      buildUI();
      do_load();
    }
  };
  save_button.onclick = function () {
    do_save();
  };
  if (typeof pc !== "undefined") {
    buildUI();
    do_load();
  }
})();

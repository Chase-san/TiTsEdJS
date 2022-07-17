"use strict";

(async function () {
  //setup all basic UI elements
  const version = "v0.2";
  const id_prefix = "titsed";
  const fg_color = "#000";
  const bg_color = "#f4f4f4";
  const right_arrow = "&#9654;";
  const left_arrow = "&#9664;";
  const editor_width = 420;

  /* The ones built into TiTs are not accurate (for some reason). */
  const valid_ass_flags = [3, 11, 30, 37, 40, 41, 47, 51];
  const valid_areola_flags = [40, 52, 53, 54];
  const valid_arm_flags = [1, 3, 4, 6, 12, 13, 19, 20, 21, 22, 23, 34, 35, 37, 38, 48];
  const valid_cock_flags = [2, 3, 6, 7, 8, 9, 10, 11, 12, 19, 21, 25, 26, 28, 29, 30, 31, 33, 36, 37, 44, 48];
  const valid_ear_flags = [1, 7, 20, 21, 34, 49, 50];
  const valid_leg_flags = [1, 2, 3, 4, 6, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 34, 35, 37, 48];
  const valid_skin_flags = [3, 4, 5, 6, 11, 12, 13, 19, 20, 21, 34, 35, 37, 39, 46, 48];
  const valid_tongue_flags = [1, 2, 3, 5, 7, 11, 12, 30, 32, 37];
  const valid_vagina_flags = [3, 11, 18, 25, 30, 33, 37, 40, 41, 44, 45, 47, 51];

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

  function sortKeysByValue(name_list) {
    //this function assumes unique string values
    const keys = Object.keys(name_list);
    const inverse = {};
    var output = [];
    var values = [];
    for (var i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const value = name_list[key];
      values.push(value);
      inverse[value] = key;
    }
    values.sort();
    for (var i = 0; i < values.length; ++i) {
      output.push(inverse[values[i]]);
    }
    return output;
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

  function createBooleanControlRow(name, obj, id) {
    const label = document.createTextNode(name);
    const e = document.createElement("input");
    e.type = "checkbox";
    const data = new Data(obj, id, e);
    data.load = function () {
      this.element.checked = this.value;
    };
    data.save = function () {
      this.value = this.element.checked;
    };
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

  const sorted_type_names = sortKeysByValue(GLOBAL.TYPE_NAMES);

  function build_ui() {
    const controls = getById(`${id_prefix}_data`);
    controls.innerHTML = "";

    //these may not work
    controls.appendChild(createHeader("Stats"));
    const stats_table = createTable();
    stats_table.appendChild(createNumberControlRow("Shields", pc, "shieldsRaw"));
    stats_table.appendChild(createNumberControlRow("Health", pc, "HPRaw"));
    stats_table.appendChild(createNumberControlRow("Lust", pc, "lustRaw"));
    stats_table.appendChild(createNumberControlRow("Energy", pc, "energyRaw"));
    stats_table.appendChild(createNumberControlRow2("Physique", pc, "physiqueRaw", "physiqueMod"));
    stats_table.appendChild(createNumberControlRow2("Reflexes", pc, "reflexesRaw", "reflexesMod"));
    stats_table.appendChild(createNumberControlRow2("Aim", pc, "aimRaw", "aimMod"));
    stats_table.appendChild(createNumberControlRow2("Intelligence", pc, "intelligenceRaw", "intelligenceMod"));
    stats_table.appendChild(createNumberControlRow2("Willpower", pc, "willpowerRaw", "willpowerMod"));
    stats_table.appendChild(createNumberControlRow2("Libido", pc, "libidoRaw", "libidoMod"));
    stats_table.appendChild(createNumberControlRow2("Taint", pc, "taintRaw", "taintMod"));
    controls.appendChild(stats_table);

    controls.appendChild(createHeader("Profile"));
    const profile_table = createTable();
    profile_table.appendChild(createNumberControlRow("Credits", pc, "credits"));
    profile_table.appendChild(createNumberControlRow("Height", pc, "tallness"));
    profile_table.appendChild(createNumberControlRow("Personality", pc, "personality"));
    profile_table.appendChild(createNumberControlRow("Exhibitionism", pc, "exhibitionismRaw"));
    controls.appendChild(profile_table);

    controls.appendChild(createHeader("Head"));
    const head_table = createTable();
    head_table.appendChild(createComboControlRow("Hair Type", pc, "hairType", GLOBAL.HAIR_TYPE_NAMES));
    head_table.appendChild(createTextControlRow("Hair Color", pc, "hairColor"));
    head_table.appendChild(createNumberControlRow("Hair Length", pc, "hairLength"));
    head_table.appendChild(createComboControlRow("Ear Type", pc, "earType", GLOBAL.TYPE_NAMES, sorted_type_names));
    head_table.appendChild(createNumberControlRow("Ear Length", pc, "earLength"));
    head_table.appendChild(createFlagRow("Ear Flags", pc, "earFlags", "ear_flag", GLOBAL.FLAG_NAMES, valid_ear_flags));
    head_table.appendChild(createNumberControlRow("Antennae Count", pc, "antennae"));
    head_table.appendChild(createComboControlRow("Antennae Type", pc, "antennaeType", GLOBAL.TYPE_NAMES, sorted_type_names));
    head_table.appendChild(createNumberControlRow("Horn Count", pc, "horns"));
    head_table.appendChild(createComboControlRow("Horn Type", pc, "hornType", GLOBAL.TYPE_NAMES));
    head_table.appendChild(createNumberControlRow("Horn Length", pc, "hornLength"));
    head_table.appendChild(createBooleanControlRow("Gills", pc, "gills"));
    controls.appendChild(head_table);

    controls.appendChild(createHeader("Face"));
    const face_table = createTable();
    face_table.appendChild(createNumberControlRow("Femininity", pc, "femininity"));
    face_table.appendChild(createComboControlRow("Face Type", pc, "faceType", GLOBAL.TYPE_NAMES, sorted_type_names));
    face_table.appendChild(createComboControlRow("Eye Type", pc, "eyeType", GLOBAL.TYPE_NAMES, sorted_type_names));
    face_table.appendChild(createTextControlRow("Eye Color", pc, "eyeColor"));
    face_table.appendChild(createNumberControlRow("Lip Size", pc, "lipMod"));
    face_table.appendChild(createTextControlRow("Lip Color", pc, "lipColor"));
    face_table.appendChild(createComboControlRow("Tongue Type", pc, "tongueType", GLOBAL.TYPE_NAMES, sorted_type_names));
    face_table.appendChild(createFlagRow("Tongue Flags", pc, "tongueFlags", "tongue_flag", GLOBAL.FLAG_NAMES, valid_tongue_flags));

    controls.appendChild(face_table);

    controls.appendChild(createHeader("Body"));
    const body_table = createTable();
    body_table.appendChild(createNumberControlRow("Tone", pc, "tone"));
    body_table.appendChild(createNumberControlRow("Thickness", pc, "thickness"));
    body_table.appendChild(createNumberControlRow2("Belly", pc, "bellyRatingRaw", "bellyRatingMod"));
    body_table.appendChild(createComboControlRow("Skin Type", pc, "skinType", GLOBAL.SKIN_TYPE_NAMES));
    body_table.appendChild(createFlagRow("Skin Flags", pc, "skinFlags", "skin_flag", GLOBAL.FLAG_NAMES, valid_skin_flags));
    body_table.appendChild(createTextControlRow("Skin Tone", pc, "skinTone"));
    body_table.appendChild(createTextControlRow("Skin Accent", pc, "skinAccent"));
    body_table.appendChild(createTextControlRow("Fur Color", pc, "furColor"));
    body_table.appendChild(createTextControlRow("Scale Color", pc, "scaleColor"));
    body_table.appendChild(createComboControlRow("Arm Type", pc, "armType", GLOBAL.TYPE_NAMES, sorted_type_names));
    body_table.appendChild(createFlagRow("Arm Flags", pc, "armFlags", "arm_flag", GLOBAL.FLAG_NAMES, valid_arm_flags));
    body_table.appendChild(createNumberControlRow("Leg Count", pc, "legCount"));
    body_table.appendChild(createComboControlRow("Leg Type", pc, "legType", GLOBAL.TYPE_NAMES, sorted_type_names));
    body_table.appendChild(createFlagRow("Leg Flags", pc, "legFlags", "leg_flag", GLOBAL.FLAG_NAMES, valid_leg_flags));
    body_table.appendChild(createNumberControlRow("Wing Count", pc, "wingCount"));
    body_table.appendChild(createComboControlRow("Wing Type", pc, "wingType", GLOBAL.TYPE_NAMES, sorted_type_names));
    controls.appendChild(body_table);

    controls.appendChild(createHeader("Tail"));
    const tail_table = createTable();
    tail_table.appendChild(createNumberControlRow("Count", pc, "tailCount"));
    tail_table.appendChild(createComboControlRow("Type", pc, "tailType", GLOBAL.TYPE_NAMES, sorted_type_names));
    tail_table.appendChild(createComboControlRow("Cum Type", pc, "tailCumType", GLOBAL.FLUID_TYPE_NAMES));
    tail_table.appendChild(createComboControlRow("GCum Type", pc, "tailGirlCumType", GLOBAL.FLUID_TYPE_NAMES));
    // tailVenom
    // tailRecharge
    // tailFlags
    // tailCunt //obj
    // tailCock //obj
    controls.appendChild(tail_table);

    controls.appendChild(createHeader("Breasts"));
    const chest_table = createTable();
    //TODO convert this into it's own data type/creater
    chest_table.appendChild(createTextRow("Add/Remove (TODO)"));
    for (var i = 0; i < pc.breastRows.length; ++i) {
      chest_table.appendChild(createHeaderRow(`Breast Row ${i}`));
      chest_table.appendChild(createNumberControlRow("Count", pc.breastRows[i], "breasts"));
      chest_table.appendChild(createNumberControlRow2("Rating", pc.breastRows[i], "breastRatingRaw", "breastRatingMod"));
      chest_table.appendChild(createNumberControlRow("Lactation", pc.breastRows[i], "breastRatingLactationMod"));
      chest_table.appendChild(createNumberControlRow("Honeypot", pc.breastRows[i], "breastRatingHoneypotMod"));
      chest_table.appendChild(createNumberControlRow("Fullness", pc.breastRows[i], "fullness"));
      chest_table.appendChild(createComboControlRow("Nipple", pc.breastRows[i], "nippleType", GLOBAL.NIPPLE_TYPE_NAMES));
      chest_table.appendChild(createFlagRow("Areola Flags", pc.breastRows[i], "areolaFlags", `br${i}_areola_flag`, GLOBAL.FLAG_NAMES, valid_areola_flags));
    }
    controls.appendChild(chest_table);

    controls.appendChild(createHeader("Nipple"));
    const nipple_table = createTable();
    nipple_table.appendChild(createTextControlRow("Color", pc, "nippleColor"));
    nipple_table.appendChild(createNumberControlRow("Length Ratio", pc, "nippleLengthRatio"));
    nipple_table.appendChild(createNumberControlRow("Width Ratio", pc, "nippleWidthRatio"));
    nipple_table.appendChild(createNumberControlRow("Per Breast", pc, "nipplesPerBreast"));
    nipple_table.appendChild(createComboControlRow("DickN Type", pc, "dickNippleType", GLOBAL.TYPE_NAMES, sorted_type_names));
    nipple_table.appendChild(createNumberControlRow("DickN Multiplier", pc, "dickNippleMultiplier"));
    controls.appendChild(nipple_table);

    controls.appendChild(createHeader("Milk"));
    const milk_table = createTable();
    milk_table.appendChild(createComboControlRow("Type", pc, "milkType", GLOBAL.FLUID_TYPE_NAMES));
    milk_table.appendChild(createNumberControlRow("Fullness", pc, "milkFullness"));
    milk_table.appendChild(createNumberControlRow("Rate", pc, "milkRate"));
    milk_table.appendChild(createNumberControlRow("Multiplier", pc, "milkMultiplier"));
    milk_table.appendChild(createNumberControlRow("Storage Multiplier", pc, "milkStorageMultiplier"));
    controls.appendChild(milk_table);

    controls.appendChild(createHeader("Genitals"));
    const genital_table = createTable();
    genital_table.appendChild(createNumberControlRow("Elasticity", pc, "elasticity"));
    genital_table.appendChild(createComboControlRow("Genital Spot", pc, "genitalSpot", GLOBAL.GENITAL_SPOT_NAMES));
    genital_table.appendChild(createBooleanControlRow("Cock Virgin", pc, "cockVirgin"));
    genital_table.appendChild(createBooleanControlRow("Vagina Virgin", pc, "vaginalVirgin"));
    //crotchFlags
    //refractoryRate: 1,
    /*
    ballEfficiency: 3,
    ballFullness: 51.43333333333334,
    ballSizeMod: 1,
    ballSizeRaw: 1.5,
    balls: 2,
    */
    genital_table.appendChild(createComboControlRow("Cum Type", pc, "cumType", GLOBAL.FLUID_TYPE_NAMES));
    genital_table.appendChild(createNumberControlRow2("Cum Multiplier", pc, "cumMultiplierRaw", "cumMultiplierMod"));
    genital_table.appendChild(createNumberControlRow2("Cum Quality", pc, "cumQualityRaw", "cumQualityMod"));
    genital_table.appendChild(createComboControlRow("GCum Type", pc, "girlCumType", GLOBAL.FLUID_TYPE_NAMES));
    genital_table.appendChild(createNumberControlRow2("GCum Multiplier", pc, "girlCumMultiplierRaw", "girlCumMultiplierMod"));
    controls.appendChild(genital_table);

    controls.appendChild(createHeader("Cock"));
    const cock_table = createTable();
    //TODO convert this into it's own data type/creater
    cock_table.appendChild(createTextRow("Add/Remove (TODO)"));
    for (var i = 0; i < pc.cocks.length; ++i) {
      cock_table.appendChild(createHeaderRow(`Cock ${i}`));
      cock_table.appendChild(createComboControlRow("Type", pc.cocks[i], "cType", GLOBAL.TYPE_NAMES, sorted_type_names));
      cock_table.appendChild(createTextControlRow("Color", pc.cocks[i], "cockColor"));
      cock_table.appendChild(createNumberControlRow2("Length", pc.cocks[i], "cLengthRaw", "cLengthMod"));
      cock_table.appendChild(createNumberControlRow2("Thickness Ratio", pc.cocks[i], "cThicknessRatioRaw", "cThicknessRatioMod"));
      cock_table.appendChild(createNumberControlRow("Flaccid Multiplier", pc.cocks[i], "flaccidMultiplier"));
      cock_table.appendChild(createNumberControlRow("Knot Multiplier", pc.cocks[i], "knotMultiplier"));
      cock_table.appendChild(createFlagRow("Flags", pc.cocks[i], "flags", `c${i}_flag`, GLOBAL.FLAG_NAMES, valid_cock_flags));
      cock_table.appendChild(createBooleanControlRow("Virgin", pc.cocks[i], "virgin"));
      // cocksock: null,
      // piercing: null,
    }
    controls.appendChild(cock_table);

    controls.appendChild(createHeader("Vagina"));
    const vagina_table = createTable();
    vagina_table.appendChild(createNumberControlRow("Clit Length", pc, "clitLength"));
    vagina_table.appendChild(createNumberControlRow2("Fertility", pc, "fertilityRaw", "fertilityMod"));
    //TODO convert this into it's own data type/creater
    vagina_table.appendChild(createTextRow("Add/Remove (TODO)"));
    for (var i = 0; i < pc.vaginas.length; ++i) {
      vagina_table.appendChild(createHeaderRow(`Vagina ${i}`));
      vagina_table.appendChild(createComboControlRow("Type", pc.vaginas[i], "type", GLOBAL.TYPE_NAMES, sorted_type_names));
      vagina_table.appendChild(createTextControlRow("Color", pc.vaginas[i], "vaginaColor"));
      vagina_table.appendChild(createNumberControlRow("Clits", pc.vaginas[i], "clits"));
      vagina_table.appendChild(createNumberControlRow("Fullness", pc.vaginas[i], "fullness"));
      vagina_table.appendChild(createNumberControlRow("Shrinks", pc.vaginas[i], "shrinkCounter"));
      vagina_table.appendChild(createBooleanControlRow("Hymen", pc.vaginas[i], "hymen"));
      vagina_table.appendChild(createNumberControlRow("Capacity", pc.vaginas[i], "bonusCapacity"));
      vagina_table.appendChild(createNumberControlRow2("Looseness", pc.vaginas[i], "loosenessRaw", "loosenessMod"));
      vagina_table.appendChild(createNumberControlRow("Min Looseness", pc.vaginas[i], "minLooseness"));
      vagina_table.appendChild(createNumberControlRow2("Wetness", pc.vaginas[i], "wetnessRaw", "wetnessMod"));
      vagina_table.appendChild(createFlagRow("Flags", pc.vaginas[i], "flags", `v${i}_flag`, GLOBAL.FLAG_NAMES, valid_vagina_flags));
      // piercing: null,
      // clitPiercing: null,
    }
    controls.appendChild(vagina_table);

    controls.appendChild(createHeader("Ass"));
    const ass_table = createTable();
    ass_table.appendChild(createNumberControlRow2("Hip Size", pc, "hipRatingRaw", "hipRatingMod"));
    ass_table.appendChild(createNumberControlRow2("Butt Size", pc, "buttRatingRaw", "buttRatingMod"));
    ass_table.appendChild(createBooleanControlRow("Anal Virgin", pc, "analVirgin"));
    ass_table.appendChild(createNumberControlRow("Anal Capacity", pc.ass, "bonusCapacity"));
    ass_table.appendChild(createNumberControlRow2("Anal Looseness", pc.ass, "loosenessRaw", "loosenessMod"));
    ass_table.appendChild(createNumberControlRow2("Anal Wetness", pc.ass, "wetnessRaw", "wetnessMod"));
    ass_table.appendChild(createFlagRow("Flags", pc.ass, "flags", 'ass_flag', GLOBAL.FLAG_NAMES, valid_ass_flags));
    controls.appendChild(ass_table);
  }

  //setup load/save
  load_button.onclick = function () {
    if (typeof pc !== "undefined") {
      build_ui();
      do_load();
    }
  };
  save_button.onclick = function () {
    do_save();
  };
  if (typeof pc !== "undefined") {
    build_ui();
    do_load();
  }
})();

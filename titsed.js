'use strict';

(async function () {

  //setup all basic UI elements
  const version = 'v0.1';
  const id_prefix = 'titsed';
  const fg_color = '#000';
  const bg_color = '#f4f4f4';
  const right_arrow = '&#9654;';
  const left_arrow = '&#9664;';
  const editor_width = 400;

  const style = document.createElement('style');
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

  const app = document.createElement('div');
  app.id = id_prefix;
  app.innerHTML = `
  <button id="${id_prefix}_show_hide">${right_arrow}</button>
  <h3>TiTsEdJS ${version}</h3>
  <table><tr>
    <td><button id="${id_prefix}_load">Load</button></td>
    <td><button id="${id_prefix}_save">Save</button></td>
  </tr></table>
  <div id="${id_prefix}_data"></div>`;
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
      app.style = '';
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
      return this.obj[this.id];
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
    const header = document.createElement('h4');
    header.innerHTML = text;
    return header;
  }

  function createTable() {
    return document.createElement('table');
  }

  function createTableRow(items) {
    const total_rows = 3;
    const row = document.createElement('tr');
    for (var i = 0; i < items.length; ++i) {
      const col = document.createElement('td');
      //check if last item
      if(i == items.length - 1) {
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

  function createBooleanControlRow(name, obj, id) {
    const label = document.createTextNode(name);
    const e = document.createElement('input');
    e.type = 'checkbox';
    const data = new Data(obj, id, e);
    data.load = function() {
      this.element.checked = this.value;
    };
    data.save = function() {
      this.value = this.element.checked;
    };
    data_list.push(data);
    return createTableRow([label, e]);
  }

  function createNumberControlRow(name, obj, id) {
    const label = document.createTextNode(name);
    const e = document.createElement('input');
    e.type = 'number';
    data_list.push(new Data(obj, id, e));
    return createTableRow([label, e]);
  }

  function createNumberControlRow2(name, obj, id0, id1) {
    const label = document.createTextNode(name);
    const e0 = document.createElement('input');
    e0.type = 'number';
    data_list.push(new Data(obj, id0, e0));
    const e1 = document.createElement('input');
    e1.type = 'number';
    data_list.push(new Data(obj, id1, e1));
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
    data_list.push(data);
    return createTableRow([label, e]);
  }

  function createComboControlRow(name, obj, id, name_list, keys=null) {
    const label = document.createTextNode(name);
    //create combo list for name_list
    if(keys == null) {
      keys = Object.keys(name_list);
    }
    const select = document.createElement('select');
    for(var i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const value = name_list[key];
      const option = new Option(value, key);
      select.appendChild(option);
    }
    data_list.push(new Data(obj, id, select));
    return createTableRow([label, select]);
  }

  const sorted_type_names = sortKeysByValue(GLOBAL.TYPE_NAMES);

  const controls = getById(`${id_prefix}_data`);

  // energyMod: 0,
  // energyRaw: 100,
  // libidoMod
  // lustMod: 0,
  // lustRaw: 1.2541666666666667,
  // perkPoints: 0,
  // physiqueMod: 0,
  // reflexesMod: 0,
  // willpowerMod: 0,

  controls.appendChild(createHeader('Profile'));
  const profile_table = createTable();
  profile_table.appendChild(createNumberControlRow('Credits', pc, 'credits'));
  profile_table.appendChild(createNumberControlRow('Height', pc, 'tallness'));
  profile_table.appendChild(createNumberControlRow('Personality', pc, 'personality'));
  profile_table.appendChild(createNumberControlRow('Exhibitionism', pc, 'exhibitionismRaw'));
  controls.appendChild(profile_table);

  controls.appendChild(createHeader('Head'));
  const head_table = createTable();
  head_table.appendChild(createComboControlRow('Hair Type', pc, 'hairType', GLOBAL.HAIR_TYPE_NAMES));
  head_table.appendChild(createTextControlRow('Hair Color', pc, 'hairColor'));
  head_table.appendChild(createNumberControlRow('Hair Length', pc, 'hairLength'));
  head_table.appendChild(createComboControlRow('Ear Type', pc, 'earType', GLOBAL.TYPE_NAMES, sorted_type_names));
  head_table.appendChild(createNumberControlRow('Ear Length', pc, 'earLength'));
  head_table.appendChild(createTextRow('Ear Flags (TODO)'));
  head_table.appendChild(createNumberControlRow('Antennae Count', pc, 'antennae'));
  head_table.appendChild(createComboControlRow('Antennae Type', pc, 'antennaeType', GLOBAL.TYPE_NAMES, sorted_type_names));
  head_table.appendChild(createNumberControlRow('Horn Count', pc, 'horns'));
  head_table.appendChild(createComboControlRow('Horn Type', pc, 'hornType', GLOBAL.TYPE_NAMES));
  head_table.appendChild(createNumberControlRow('Horn Length', pc, 'hornLength'));
  head_table.appendChild(createBooleanControlRow('Gills', pc, 'gills'));
  controls.appendChild(head_table);

  controls.appendChild(createHeader('Face'));
  const face_table = createTable();
  face_table.appendChild(createNumberControlRow('Femininity', pc, 'femininity'));
  face_table.appendChild(createComboControlRow('Face Type', pc, 'faceType', GLOBAL.TYPE_NAMES, sorted_type_names));
  face_table.appendChild(createComboControlRow('Eye Type', pc, 'eyeType', GLOBAL.TYPE_NAMES, sorted_type_names));
  face_table.appendChild(createTextControlRow('Eye Color', pc, 'eyeColor'));
  face_table.appendChild(createNumberControlRow('Lip Size', pc, 'lipMod'));
  face_table.appendChild(createTextControlRow('Lip Color', pc, 'lipColor'));
  face_table.appendChild(createComboControlRow('Tongue Type', pc, 'tongueType', GLOBAL.TYPE_NAMES, sorted_type_names));
  face_table.appendChild(createTextRow('Tongue Flags (TODO)')); //tongueFlags

  controls.appendChild(face_table);

  controls.appendChild(createHeader('Body'));
  const body_table = createTable();
  body_table.appendChild(createNumberControlRow('Tone', pc, 'tone'));
  body_table.appendChild(createNumberControlRow('Thickness', pc, 'thickness'));
  body_table.appendChild(createNumberControlRow2('Belly', pc, 'bellyRatingRaw', 'bellyRatingMod'));
  body_table.appendChild(createComboControlRow('Skin Type', pc, 'skinType', GLOBAL.SKIN_TYPE_NAMES));
  body_table.appendChild(createTextRow('Skin Flags (TODO)')); //skinFlags
  body_table.appendChild(createTextControlRow('Skin Tone', pc, 'skinTone'));
  body_table.appendChild(createTextControlRow('Skin Accent', pc, 'skinAccent'));
  body_table.appendChild(createTextControlRow('Fur Color', pc, 'furColor'));
  body_table.appendChild(createTextControlRow('Scale Color', pc, 'scaleColor'));
  body_table.appendChild(createComboControlRow('Arm Type', pc, 'armType', GLOBAL.TYPE_NAMES, sorted_type_names));
  body_table.appendChild(createTextRow('Arm Flags (TODO)')); //armFlags
  body_table.appendChild(createNumberControlRow('Leg Count', pc, 'legCount'));
  body_table.appendChild(createComboControlRow('Leg Type', pc, 'legType', GLOBAL.TYPE_NAMES, sorted_type_names));
  body_table.appendChild(createTextRow('Leg Flags (TODO)')); //legFlags
  body_table.appendChild(createNumberControlRow('Wing Count', pc, 'wingCount'));
  body_table.appendChild(createComboControlRow('Wing Type', pc, 'wingType', GLOBAL.TYPE_NAMES, sorted_type_names));
  controls.appendChild(body_table);

  controls.appendChild(createHeader('Tail'));
  const tail_table = createTable();
  tail_table.appendChild(createNumberControlRow('Count', pc, 'tailCount'));
  tail_table.appendChild(createComboControlRow('Type', pc, 'tailType', GLOBAL.TYPE_NAMES, sorted_type_names));
  tail_table.appendChild(createComboControlRow('Cum Type', pc, 'tailCumType', GLOBAL.FLUID_TYPE_NAMES));
  tail_table.appendChild(createComboControlRow('GCum Type', pc, 'tailGirlCumType', GLOBAL.FLUID_TYPE_NAMES));
  // tailVenom
  // tailRecharge
  // tailFlags
  // tailCunt //obj
  // tailCock //obj
  controls.appendChild(tail_table);

  controls.appendChild(createHeader('Breasts'));
  const chest_table = createTable();
  controls.appendChild(chest_table);

  controls.appendChild(createHeader('Nipple'));
  const nipple_table = createTable();
  nipple_table.appendChild(createTextControlRow('Color', pc, 'nippleColor'));
  nipple_table.appendChild(createNumberControlRow('Length Ratio', pc, 'nippleLengthRatio'));
  nipple_table.appendChild(createNumberControlRow('Width Ratio', pc, 'nippleWidthRatio'));
  nipple_table.appendChild(createNumberControlRow('Per Breast', pc, 'nipplesPerBreast'));
  nipple_table.appendChild(createComboControlRow('DickN Type', pc, 'dickNippleType', GLOBAL.TYPE_NAMES, sorted_type_names));
  nipple_table.appendChild(createNumberControlRow('DickN Multiplier', pc, 'dickNippleMultiplier'));
  controls.appendChild(nipple_table);

  controls.appendChild(createHeader('Milk'));
  const milk_table = createTable();
  milk_table.appendChild(createComboControlRow('Type', pc, 'milkType', GLOBAL.FLUID_TYPE_NAMES));
  milk_table.appendChild(createNumberControlRow('Fullness', pc, 'milkFullness'));
  milk_table.appendChild(createNumberControlRow('Rate', pc, 'milkRate'));
  milk_table.appendChild(createNumberControlRow('Multiplier', pc, 'milkMultiplier'));
  milk_table.appendChild(createNumberControlRow('Storage Multiplier', pc, 'milkStorageMultiplier'));
  controls.appendChild(milk_table);

  controls.appendChild(createHeader('Genitals'));
  const genital_table = createTable();
  genital_table.appendChild(createNumberControlRow('Elasticity', pc, 'elasticity'));
  genital_table.appendChild(createComboControlRow('Genital Spot', pc, 'genitalSpot', GLOBAL.GENITAL_SPOT_NAMES));
  genital_table.appendChild(createBooleanControlRow('Cock Virgin', pc, 'cockVirgin'));
  genital_table.appendChild(createBooleanControlRow('Vagina Virgin', pc, 'vaginalVirgin'));
  //crotchFlags
  //refractoryRate: 1,
  /*
  ballEfficiency: 3,
  ballFullness: 51.43333333333334,
  ballSizeMod: 1,
  ballSizeRaw: 1.5,
  balls: 2,
  */
  genital_table.appendChild(createComboControlRow('Cum Type', pc, 'cumType', GLOBAL.FLUID_TYPE_NAMES));
  genital_table.appendChild(createNumberControlRow2('Cum Multiplier', pc, 'cumMultiplierRaw', 'cumMultiplierMod'));
  genital_table.appendChild(createNumberControlRow2('Cum Quality', pc, 'cumQualityRaw', 'cumQualityMod'));

  genital_table.appendChild(createComboControlRow('GCum Type', pc, 'girlCumType', GLOBAL.FLUID_TYPE_NAMES));
  genital_table.appendChild(createNumberControlRow2('GCum Multiplier', pc, 'girlCumMultiplierRaw', 'girlCumMultiplierMod'));

  controls.appendChild(genital_table);

  controls.appendChild(createHeader('Cock'));
  const cock_table = createTable();
  controls.appendChild(cock_table);

  controls.appendChild(createHeader('Vagina'));
  const vagina_table = createTable();
  vagina_table.appendChild(createNumberControlRow('Clit Length', pc, 'clitLength'));
  vagina_table.appendChild(createNumberControlRow2('Fertility', pc, 'fertilityRaw', 'fertilityMod'));
  // vaginas
  controls.appendChild(vagina_table);


  controls.appendChild(createHeader('Ass'));
  const ass_table = createTable();
  ass_table.appendChild(createNumberControlRow2('Hip Size', pc, 'hipRatingRaw', 'hipRatingMod'));
  ass_table.appendChild(createNumberControlRow2('Butt Size', pc, 'buttRatingRaw', 'buttRatingMod'));
  ass_table.appendChild(createBooleanControlRow('Anal Virgin', pc, 'analVirgin'));
  ass_table.appendChild(createNumberControlRow('Anal Capacity', pc.ass, 'bonusCapacity'));
  ass_table.appendChild(createNumberControlRow2('Anal Looseness', pc.ass, 'loosenessRaw', 'loosenessMod'));
  ass_table.appendChild(createNumberControlRow2('Anal Wetness', pc.ass, 'wetnessRaw', 'wetnessMod'));
  controls.appendChild(ass_table);

  //setup load/save
  load_button.onclick = function () {
    do_load();
  };
  save_button.onclick = function () {
    do_save();
  };
  if (typeof pc !== "undefined") {
    do_load();
  }

})();

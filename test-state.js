'use strict';
/* eslint-disable no-unused-vars */

// this creates a fake game structure for testing purposes
const __TODO__ = 'This element has not been mapped!!';
var flags = {};
var pc = {
  createBreastRow: function() {
    // This is not how the game works! This is for testing purposes only!
    pc.breastRows.push({
      areolaFlags: [],              // DONE
      breastRatingHoneypotMod: 0,   // DONE
      breastRatingLactationMod: 0,  // DONE
      breastRatingMod: 0,           // DONE
      breastRatingRaw: 0,           // DONE
      breasts: 2,                   // DONE
      fullness: 0,                  // DONE
      nippleType: 0,                // DONE
      piercing: null,
      version: 2,
      neverSerialize: false,
    });
  },
  createCock: function() {
    // This is not how the game works! This is for testing purposes only!
    pc.cocks.push({
      cLengthMod: 0,            // DONE
      cLengthRaw: 8,            // DONE
      cThicknessRatioMod: 0,    // DONE
      cThicknessRatioRaw: 1,    // DONE
      cType: 0,                 // DONE
      cockColor: 'pink',        // DONE
      flaccidMultiplier: 0.25,  // DONE
      flags: [],                // DONE
      knotMultiplier: 1,        // DONE
      virgin: true,             // DONE
      cocksock: null,
      piercing: null,
      version: 3,
      neverSerialize: false,
    });
  },
  createVagina: function() {
    // This is not how the game works! This is for testing purposes only!
    pc.vaginas.push({
      bonusCapacity: 30,    // DONE
      clits: 1,             // DONE
      flags: [],            // DONE
      fullness: 0,          // DONE
      hymen: true,          // DONE
      loosenessMod: 0,      // DONE
      loosenessRaw: 1,      // DONE
      minLooseness: 1,      // DONE
      shrinkCounter: 0,     // DONE
      type: 0,              // DONE
      vaginaColor: 'pink',  // DONE
      wetnessMod: 0,        // DONE
      wetnessRaw: 3,        // DONE
      piercing: null,
      clitPiercing: null,
      version: 3,
      neverSerialize: false,
    });
  },
  removeBreastRow: function(index) {
    pc.breastRows.splice(index, 1);
  },
  removeCock: function(index) {
    pc.cocks.splice(index, 1);
  },
  removeVagina: function(index) {
    pc.vaginas.splice(index, 1);
  },
  HPMod: 0,
  HPRaw: 20,           // DONE
  aimRaw: 3,           // DONE
  intelligenceRaw: 4,  // DONE
  libidoRaw: 3,        // DONE
  physiqueRaw: 3,      // DONE
  reflexesRaw: 3,      // DONE
  taintRaw: 0,         // DONE
  willpowerRaw: 3,     // DONE
  XPRaw: 0,
  a: 'a ',
  affinity: 'intelligence',
  aimMod: 0,  // DONE
  alreadyDefeated: false,
  analVirgin: true,  // DONE
  antennae: 0,       // DONE
  antennaeType: 0,   // DONE
  armFlags: [],      // DONE
  armType: 0,        // DONE
  ass: {
    bonusCapacity: 0,  // DONE
    clitPiercing: null,
    clits: 0,
    flags: [],  // DONE
    fullness: 0,
    hymen: false,
    loosenessMod: 0,  // DONE
    loosenessRaw: 1,  // DONE
    minLooseness: 1,
    neverSerialize: false,
    piercing: null,
    shrinkCounter: 0,
    type: 0,
    vaginaColor: 'pink',
    version: 3,
    wetnessMod: 0,  // DONE
    wetnessRaw: 0,  // DONE
  },
  ballEfficiency: 3,                // DONE
  ballFullness: 51.43333333333334,  // DONE
  ballSizeMod: 1,                   // DONE
  ballSizeRaw: 1.5,                 // DONE
  balls: 2,                         // DONE
  beardColor: 'no',
  beardLength: 0,
  beardStyle: 0,
  beardType: 0,
  bellyRatingMod: 0,  // DONE
  bellyRatingRaw: 0,  // DONE
  breastRows: [
    {
      areolaFlags: [],              // DONE
      breastRatingHoneypotMod: 0,   // DONE
      breastRatingLactationMod: 0,  // DONE
      breastRatingMod: 0,           // DONE
      breastRatingRaw: 0,           // DONE
      breasts: 2,                   // DONE
      fullness: 0,                  // DONE
      neverSerialize: false,
      nippleType: 0,  // DONE
      piercing: null,
      version: 2,
    },
  ],
  buttRatingMod: 0,  // DONE
  buttRatingRaw: 2,  // DONE
  buttonText: null,
  buyMarkdown: 1,
  characterClass: 1,
  clitLength: 0.5,   // DONE
  cockVirgin: true,  // DONE
  cocks: [
    {
      cLengthMod: 0,          // DONE
      cLengthRaw: 8,          // DONE
      cThicknessRatioMod: 0,  // DONE
      cThicknessRatioRaw: 1,  // DONE
      cType: 0,               // DONE
      cockColor: 'pink',      // DONE
      cocksock: null,
      flaccidMultiplier: 0.25,  // DONE
      flags: [],                // DONE
      knotMultiplier: 1,        // DONE
      neverSerialize: false,
      piercing: null,
      version: 3,
      virgin: true,  // DONE
    },
  ],
  credits: 500,         // DONE
  crotchFlags: [],      // DONE
  cumMultiplierMod: 0,  // DONE
  cumMultiplierRaw: 1,  // DONE
  cumQualityMod: 0,     // DONE
  cumQualityRaw: 1,     // DONE
  cumType: 2,           // DONE
  customBlock: '',
  customDodge: '',
  defaultBreastRowIndex: 0,
  defaultCockIndex: 0,
  defaultVaginaIndex: 0,
  dickNippleMultiplier: 3,  // DONE
  dickNippleType: 0,        // DONE
  dildo: null,
  earFlags: [50],  // DONE
  earLength: 0,    // DONE
  earType: 0,      // DONE
  eggs: 0,
  elasticity: 1,  // DONE
  energyDisplayName: 'ENERGY',
  energyMod: 0,
  energyRaw: 100,       // DONE
  exhibitionismRaw: 0,  // DONE
  eyeColor: 'blue',     // DONE
  eyeType: 0,           // DONE
  faceFlags: [],        // DONE
  faceType: 0,          // DONE
  femininity: 30,       // DONE
  fertilityMod: 0,      // DONE
  fertilityRaw: 1,      // DONE
  fertilizedEggs: 0,
  fluidSimulate: false,
  furColor: 'black',        // DONE
  genitalSpot: 0,           // DONE
  gills: false,             // DONE
  girlCumMultiplierMod: 0,  // DONE
  girlCumMultiplierRaw: 1,  // DONE
  girlCumType: 5,           // DONE
  hairColor: 'black',       // DONE
  hairLength: 1,            // DONE
  hairStyle: 'null',
  hairType: 0,      // DONE
  hipRatingMod: 0,  // DONE
  hipRatingRaw: 1,  // DONE
  hornLength: 0,    // DONE
  hornType: 0,      // DONE
  horns: 0,         // DONE
  hpDisplayName: 'HP',
  impregnationType: '',
  inseminatorProCumQ: 0,
  inseminatorProEnabled: 0,
  inseminatorProMaxCum: 1,
  inseminatorProRefractoryRate: 1,
  inseminatorProRefractoryRateOrig: 1,
  inseminatorProVirility: 1,
  intelligenceMod: 0,  // DONE
  inventory: {
    storage: [],
    /* other variables are TODO */
  },
  isLustImmune: false,
  isPlural: false,
  isUniqueInFight: false,
  keeperBuy: 'What would you like to buy?\n',
  keeperGreeting: '<i>Hello and welcome to my shop. Take a gander and let me know if you see anything you like,</i> a  says with a smile.\n',
  keeperSell: 'What would you like to sell?\n',
  keyItems: [],
  legCount: 2,     // DONE
  legFlags: [16],  // DONE
  legType: 0,      // DONE
  level: 1,
  libidoMod: 0,       // DONE
  lipColor: 'peach',  // DONE
  lipMod: 0,          // DONE
  long_internal: 'You scrawny, yo.',
  lustMod: 0,
  lustRaw: 1.2541666666666667,  // DONE
  lustSimulate: false,
  milkFullness: 0,           // DONE
  milkMultiplier: 0,         // DONE
  milkRate: 10,              // DONE
  milkStorageMultiplier: 1,  // DONE
  milkType: 0,               // DONE
  minutesSinceCum: 43,
  neverSerialize: false,
  nippleColor: 'pink',   // DONE
  nippleLengthRatio: 1,  // DONE
  nippleWidthRatio: 1,   // DONE
  nipplesPerBreast: 1,   // DONE
  originalRace: 'human',
  perkPoints: 0,
  perks: [ //pc.removePerk("Ice Cold");
    {
      combatOnly: false,
      hidden: true,
      iconName: '',
      iconShade: 'var(--textColor)',
      minutesLeft: 0,
      neverSerialize: false,
      storageName: 'Ice Cold',
      tooltip: 'Slows lust gain over time and improves low libido teasing.',
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      version: 1
    },
    {
      combatOnly: false,
      hidden: true,
      iconName: '',
      iconShade: 'var(--textColor)',
      minutesLeft: 0,
      neverSerialize: false,
      storageName: 'STD Immune',
      tooltip: 'You are immune to sexually transmitted diseases.',
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      version: 1
    }
  ],
  personality: 50,  // DONE
  physiqueMod: 0,   // DONE
  pregnancyData: [
    {
      pregnancyBellyRatingContribution: 0,
      pregnancyIncubation: 0,
      pregnancyIncubationMulti: 1,
      pregnancyQuantity: 0,
      pregnancyType: '',
      neverSerialize: false,
      version: 1
    },
    {
      pregnancyBellyRatingContribution: 0,
      pregnancyIncubation: 0,
      pregnancyIncubationMulti: 1,
      pregnancyQuantity: 0,
      pregnancyType: '',
      neverSerialize: false,
      version: 1
    },
    {
      pregnancyBellyRatingContribution: 0,
      pregnancyIncubation: 0,
      pregnancyIncubationMulti: 1,
      pregnancyQuantity: 0,
      pregnancyType: '',
      neverSerialize: false,
      version: 1
    },
    {
      pregnancyBellyRatingContribution: 0,
      pregnancyIncubation: 0,
      pregnancyIncubationMulti: 1,
      pregnancyQuantity: 0,
      pregnancyType: '',
      neverSerialize: false,
      version: 1
    }
  ],
  pregnancyIncubationBonusFatherMod: 0,  // DONE
  pregnancyIncubationBonusFatherRaw: 1,  // DONE
  pregnancyIncubationBonusMotherMod: 0,  // DONE
  pregnancyIncubationBonusMotherRaw: 1,  // DONE
  pregnancyMultiplierMod: 0,             // DONE
  pregnancyMultiplierRaw: 1,             // DONE
  reflexesMod: 0,                        // DONE
  refractoryRate: 1,                     // DONE
  scaleColor: 'blue',                    // DONE
  scrotumColorRaw: '',
  scrotumTypeRaw: -1,
  sellMarkup: 1,
  sexualPreferences: {
    neverSerialize: false,
    sexPrefs: {},  // doesn't apply to PC
    version: 1,
  },
  shieldDisplayName: 'SHIELDS',
  shieldsRaw: 14,    // DONE
  short: 'Jack',     // Use the in game method bro...
  skinAccent: '',    // DONE
  skinFlags: [],     // DONE
  skinTone: 'fair',  // DONE
  skinType: 0,       // DONE
  statusEffects: [],
  statusSimulate: false,
  synthWombSetting: 1,
  tailCock: {
    cLengthMod: 0,          // DONE
    cLengthRaw: 5,          // DONE
    cThicknessRatioMod: 0,  // DONE
    cThicknessRatioRaw: 1,  // DONE
    cType: 0,               // DONE
    cockColor: 'pink',      // DONE
    cocksock: null,
    flaccidMultiplier: 0.25,  // DONE
    flags: [],                // DONE
    knotMultiplier: 1,        // DONE
    neverSerialize: false,
    piercing: null,
    version: 3,
    virgin: true,  // DONE
  },
  tailCount: 0,    // DONE
  tailCumType: 2,  // DONE
  tailCunt: {
    bonusCapacity: 0,  // DONE
    clitPiercing: null,
    clits: 1,         // DONE
    flags: [],        // DONE
    fullness: 0,      // DONE
    hymen: true,      // DONE
    loosenessMod: 0,  // DONE
    loosenessRaw: 1,  // DONE
    minLooseness: 1,  // DONE
    neverSerialize: false,
    piercing: null,
    shrinkCounter: 0,     // DONE
    type: 0,              // DONE
    vaginaColor: 'pink',  // DONE
    version: 3,
    wetnessMod: 0,  // DONE
    wetnessRaw: 1,  // DONE
  },
  tailFlags: [],       // DONE
  tailGirlCumType: 5,  // DONE
  tailRecharge: 5,
  tailType: 0,  // DONE
  tailVenom: 0,
  taintMod: 0,    // DONE
  tallness: 84,   // DONE
  teaseLevel: 0,  // DONE
  teaseXP: 0,     // DONE
  thickness: 70,  // DONE
  timesCum: 0,
  tone: 100,        // DONE
  tongueFlags: [],  // DONE
  tongueType: 0,    // DONE
  typesBought: [],
  unclaimedClassPerks: 0,
  unclaimedGenericPerks: 0,
  uniqueName: null,
  unspentStatPoints: 0,
  vaginalVirgin: true,  // DONE
  vaginas: [
    {
      bonusCapacity: 30,  // DONE
      clitPiercing: null,
      clits: 1,         // DONE
      flags: [],        // DONE
      fullness: 0,      // DONE
      hymen: true,      // DONE
      loosenessMod: 0,  // DONE
      loosenessRaw: 1,  // DONE
      minLooseness: 1,  // DONE
      neverSerialize: false,
      piercing: null,
      shrinkCounter: 0,     // DONE
      type: 0,              // DONE
      vaginaColor: 'pink',  // DONE
      version: 3,
      wetnessMod: 0,  // DONE
      wetnessRaw: 3,  // DONE
    },
  ],
  version: 2,
  willpowerMod: 0,  // DONE
  wingCount: 0,     // DONE
  wingType: 0,      // DONE
  length: 0,
};
var GLOBAL = {
  ACCESSORY: 9,
  ALL: 12,
  ARMOR: 5,
  BESS_AFFECTION_DATE: 9,
  BESS_AFFECTION_GRAVIBALL: 6,
  BESS_AFFECTION_KAREOKE: 7,
  BESS_AFFECTION_SEX: 2,
  BESS_AFFECTION_SEX_LOVERSMORNINGS: 8,
  BESS_AFFECTION_SLEEPWITH: 3,
  BESS_AFFECTION_SLEEPWITHANDOTHERS: 4,
  BESS_AFFECTION_SLEEPWITHOTHER: 5,
  BESS_AFFECTION_SPENDTIME: 1,
  BESS_AT_TAVROS: 1,
  BESS_DISABLED: 3,
  BESS_E3_MORE: 1,
  BESS_E3_PATH: 2,
  BESS_ON_CREW: 2,
  BIANCA_REJECTION_GOO: 2,
  BIANCA_REJECTION_NEUTER: 4,
  BIANCA_REJECTION_STD: 1,
  BIANCA_REJECTION_TAUR: 2,
  BIANCA_TOPIC_CHILDREN: 128,
  BIANCA_TOPIC_DOCTOR: 8,
  BIANCA_TOPIC_FAMILY: 64,
  BIANCA_TOPIC_HERSELF: 1,
  BIANCA_TOPIC_MODS: 2,
  BIANCA_TOPIC_PARENTS: 32,
  BIANCA_TOPIC_STORIES: 16,
  BIANCA_TOPIC_WORK: 4,
  BOTHRIOC_QUEST_DIPLOMACY: 2,
  BOTHRIOC_QUEST_FAILURE: -1,
  BOTHRIOC_QUEST_QUADOMME: 3,
  BOTHRIOC_QUEST_RESEARCH: 1,
  BOTHRIOC_QUEST_START: 0,
  BOTHRIOC_QUEST_SUCCESS: 4,
  CELISE_ONBOARD: 1,
  CHILD_TYPE_EGGS: 2,
  CHILD_TYPE_LIVE: 1,
  CHILD_TYPE_SEED: 3,
  CLASS_ENGINEER: 2,
  CLASS_MERCENARY: 1,
  CLASS_NAMES: {
    0: 'Smuggler',
    1: 'Mercenary',
    2: 'Engineer',
    3: 'Psionic',
  },
  CLASS_PSIONIC: 3,
  CLASS_SMUGGLER: 0,
  CLOTHING: 11,
  COCKWEAR: 19,
  COLLAR_LIST: ['Jerynn’s', 'Sera’s', 'Sub-Tuner', 'Vark\'s', '[lorelei.name]\'s', 'Lund\'s'],
  COMBAT_IMPLANT: 21,
  COMMON: 0,
  CUSTOM: 2,
  DECORATION: 23,
  DEPENDANT_ANAL: 3,
  DEPENDANT_ANY: 0,
  DEPENDANT_CUM: 2,
  DEPENDANT_MYRVENOM: 1,
  DRUG: 10,
  EXPLOSIVECONSUMABLE: 14,
  FAZIAN_QUEST_BRIBED: 8,
  FAZIAN_QUEST_COMPLETE: 1,
  FAZIAN_QUEST_FAILED: 5,
  FAZIAN_QUEST_INVESTIGATED: 6,
  FAZIAN_QUEST_NOTSTARTED: 0,
  FAZIAN_QUEST_OFFERING: 2,
  FAZIAN_QUEST_REJECTED: 4,
  FAZIAN_QUEST_RESCUE: 7,
  FAZIAN_QUEST_STARTED: 3,
  FEIAN_SEX_FEMALE: 0,
  FEIAN_SEX_HERM: 2,
  FEIAN_SEX_MALE: 1,
  FIREPUP_BEND: 2,
  FIREPUP_BUTT: 3,
  FIREPUP_KNEEL: 1,
  FLAG_ABSORBENT: 39,
  FLAG_AMORPHOUS: 19,
  FLAG_ANGULAR: 15,
  FLAG_APHRODISIAC_LACED: 11,
  FLAG_ARTIFICIAL: 56,
  FLAG_BEAK: 43,
  FLAG_BLUNT: 10,
  FLAG_CHITINOUS: 34,
  FLAG_COCK_GRIFFIN: 64,
  FLAG_CORKSCREWED: 44,
  FLAG_DIGITIGRADE: 17,
  FLAG_DOUBLE_HEADED: 36,
  FLAG_FEATHERED: 35,
  FLAG_FLARED: 8,
  FLAG_FLOPPY: 50,
  FLAG_FLOWER_SHAPED: 54,
  FLAG_FLUFFY: 4,
  FLAG_FORESKINNED: 31,
  FLAG_FRECKLED: 46,
  FLAG_FURRED: 20,
  FLAG_GENITAL_SLIT: 57,
  FLAG_GOOEY: 37,
  FLAG_GOO_ARMS: 16,
  FLAG_GOO_COCK: 2,
  FLAG_GOO_CUNT: 4,
  FLAG_GOO_LEGS: 8,
  FLAG_GOO_TONE: 32,
  FLAG_HEART_SHAPED: 52,
  FLAG_HEELS: 24,
  FLAG_HOLLOW: 32,
  FLAG_HOOVES: 22,
  FLAG_HYPER_PUMPED: 51,
  FLAG_KNOTTED: 9,
  FLAG_LONG: 1,
  FLAG_LUBRICATED: 3,
  FLAG_MUZZLED: 14,
  FLAG_NAMES: {
    0: 'OFFSET -- INVALID',
    1: 'Long',
    2: 'Prehensile',
    3: 'Lubricated',
    4: 'Fluffy',
    5: 'Squishy',
    6: 'Smooth',
    7: 'Tapered',
    8: 'Flared',
    9: 'Knotted',
    10: 'Blunt',
    11: 'Aphrodisiac',
    12: 'Sticky',
    13: 'Thick',
    14: 'Muzzled',
    15: 'Angular',
    16: 'Plantigrade',
    17: 'Digitgrade',
    18: 'Tendril',
    19: 'Amorphous',
    20: 'Furred',
    21: 'Scaled',
    22: 'Hooves',
    23: 'Paws',
    24: 'Heels',
    25: 'Ovipositor',
    26: 'Sheathed',
    27: 'Tailcock',
    28: 'Stinger Base',
    29: 'Stinger Tip',
    30: 'Nubby',
    31: 'Foreskinned',
    32: 'Hollow',
    33: 'Ribbed',
    34: 'Chitinous',
    35: 'Feathered',
    36: 'Double Headed',
    37: 'Gooey',
    38: 'Spiked',
    39: 'Absorbent',
    40: 'Slightly Pumped',
    41: 'Fully Pumped',
    42: 'Tailcunt',
    43: 'Beaked',
    44: 'Corkscrewed',
    45: 'Tongued',
    46: 'Freckled',
    47: 'Plugged',
    48: 'Partially Scaled',
    49: 'Short',
    50: 'Floppy',
    51: 'Hyper Pumped',
    52: 'Heart-Shaped',
    53: 'Star-Shaped',
    54: 'Flower-Shaped',
    55: 'Parasitic',
    56: 'Artificial',
    57: 'Genital Slit',
    58: 'Uniball',
  },
  FLAG_NUBBY: 30,
  FLAG_OVIPOSITOR: 25,
  FLAG_PARASITIC: 55,
  FLAG_PAWS: 23,
  FLAG_PLANTIGRADE: 16,
  FLAG_PLUGGED: 47,
  FLAG_PREHENSILE: 2,
  FLAG_PUMPED: 41,
  FLAG_RIBBED: 33,
  FLAG_SCALED: 21,
  FLAG_SCALED_PRETTY: 48,
  FLAG_SHEATHED: 26,
  FLAG_SHORT: 49,
  FLAG_SLIGHTLY_PUMPED: 40,
  FLAG_SMOOTH: 6,
  FLAG_SPIKED: 38,
  FLAG_SQUISHY: 5,
  FLAG_STAR_SHAPED: 53,
  FLAG_STICKY: 12,
  FLAG_STINGER_BASED: 28,
  FLAG_STINGER_TIPPED: 29,
  FLAG_TAILCOCK: 27,
  FLAG_TAILCUNT: 42,
  FLAG_TAPERED: 7,
  FLAG_TENDRIL: 18,
  FLAG_THICK: 13,
  FLAG_TONGUE: 45,
  FLAG_UNIBALL: 58,
  FLAG_USED: 1,
  FLUID_TYPE_BLUEBERRY_YOGURT: 22,
  FLUID_TYPE_CHOCOLATE_CUM: 19,
  FLUID_TYPE_CHOCOLATE_MILK: 7,
  FLUID_TYPE_CUM: 2,
  FLUID_TYPE_CUMSAP: 6,
  FLUID_TYPE_CUNDARIAN_SEED: 30,
  FLUID_TYPE_EGGNOG: 27,
  FLUID_TYPE_FRUIT_CUM: 25,
  FLUID_TYPE_FRUIT_GIRLCUM: 26,
  FLUID_TYPE_GABILANI_CUM: 14,
  FLUID_TYPE_GABILANI_GIRLCUM: 15,
  FLUID_TYPE_GIRLCUM: 5,
  FLUID_TYPE_HONEY: 1,
  FLUID_TYPE_HRAD_CUM: 23,
  FLUID_TYPE_LEITHAN_MILK: 13,
  FLUID_TYPE_MILK: 0,
  FLUID_TYPE_MILKSAP: 4,
  FLUID_TYPE_NAMES: {
    0: 'Milk',
    1: 'Honey',
    2: 'Cum',
    3: 'Oil',
    4: 'Milksap',
    5: 'Girl Cum',
    6: 'Cumsap',
    7: 'Chocolate Milk',
    8: 'Strawberry Milk',
    9: 'Sydian Cum',
    10: 'Vanae Maiden Milk',
    11: 'Vanae Huntress Milk',
    12: 'Nectar',
    13: 'Leithan Milk',
    14: 'Gabilani Cum',
    15: 'Gabilani Girl Cum',
    16: 'Vanilla',
    17: 'Nyrea Cum',
    18: 'Goo',
    19: 'Chocolate Cum',
    20: 'Vanae Cum',
    21: 'Nyrea Girl Cum',
    22: 'Blueberry Yogurt',
    23: 'Hradian Cum',
    24: 'Goo Cum',
    25: 'Fruit Cum',
    26: 'Fruit Girl Cum',
    27: 'Eggnog',
    28: 'Peppermint Cum',
    29: 'Sugar Glaze',
    30: 'Cumdarian Seed',
  },
  FLUID_TYPE_NECTAR: 12,
  FLUID_TYPE_NYREA_CUM: 17,
  FLUID_TYPE_NYREA_GIRLCUM: 21,
  FLUID_TYPE_OIL: 3,
  FLUID_TYPE_PEPPERMINT: 28,
  FLUID_TYPE_SHORT: {
    // not the actual short names
    0: 'Milk',
    1: 'Honey',
    2: 'Cum',
    3: 'Oil',
    4: 'Milksap',
    5: 'Girl Cum',
    6: 'Cumsap',
    7: 'Chocolate Milk',
    8: 'Strawberry Milk',
    9: 'Sydian Cum',
    10: 'Vanae Maiden Milk',
    11: 'Vanae Huntress Milk',
    12: 'Nectar',
    13: 'Leithan Milk',
    14: 'Gabilani Cum',
    15: 'Gabilani Girl Cum',
    16: 'Vanilla',
    17: 'Nyrea Cum',
    18: 'Goo',
    19: 'Chocolate Cum',
    20: 'Vanae Cum',
    21: 'Nyrea Girl Cum',
    22: 'Blueberry Yogurt',
    23: 'Hradian Cum',
    24: 'Goo Cum',
    25: 'Fruit Cum',
    26: 'Fruit Girl Cum',
    27: 'Eggnog',
    28: 'Peppermint Cum',
    29: 'Sugar Glaze',
    30: 'Cumdarian Seed',
  },
  FLUID_TYPE_SPECIAL_CUMGOO: 24,
  FLUID_TYPE_SPECIAL_GOO: 18,
  FLUID_TYPE_STRAWBERRY_MILK: 8,
  FLUID_TYPE_SUGAR: 29,
  FLUID_TYPE_SYDIAN_CUM: 9,
  FLUID_TYPE_VANAE_CUM: 20,
  FLUID_TYPE_VANAE_HUNTRESS_MILK: 11,
  FLUID_TYPE_VANAE_MAIDEN_MILK: 10,
  FLUID_TYPE_VANILLA: 16,
  FOOD: 1,
  GADGET: 13,
  GAST_PREG_COST: 15000,
  GEM: 16,
  GENITAL_SPOT_MIDTAIL: 1,
  GENITAL_SPOT_NAMES: {0: 'Waist', 1: 'Mid-tail', 2: 'Hind legs', 3: 'Under-tail'},
  GENITAL_SPOT_REARLEGS: 2,
  GENITAL_SPOT_UNDERTAIL: 3,
  GENITAL_SPOT_WAIST: 0,
  HAIR_TYPE_FEATHERS: 1,
  HAIR_TYPE_GOO: 3,
  HAIR_TYPE_NAMES: {0: 'Hair', 1: 'Feathers', 2: 'Transparent', 3: 'Gooey', 4: 'Tentacles', 5: 'Quills', 6: 'Plant'},
  HAIR_TYPE_PLANT: 6,
  HAIR_TYPE_QUILLS: 5,
  HAIR_TYPE_REGULAR: 0,
  HAIR_TYPE_TENTACLES: 4,
  HAIR_TYPE_TRANSPARENT: 2,
  ITEM_FLAG_AIRTIGHT: 4,
  ITEM_FLAG_ALCOHOLIC: 51,
  ITEM_FLAG_ANALLY_SEALED: 26,
  ITEM_FLAG_ANAL_CHASTITY: 24,
  ITEM_FLAG_ANTIGRAV: 19,
  ITEM_FLAG_BLIND_IGNORE: 20,
  ITEM_FLAG_BOW_WEAPON: 0,
  ITEM_FLAG_BURSTSHOT: 43,
  ITEM_FLAG_COCKRING: 50,
  ITEM_FLAG_COCKSOCK: 49,
  ITEM_FLAG_COMBAT_DRONE: 15,
  ITEM_FLAG_COVER_BODY: 21,
  ITEM_FLAG_DHAAL_DRESS_CLOTHES: 54,
  ITEM_FLAG_EFFECT_FLURRYBONUS: 3,
  ITEM_FLAG_ENERGY_WEAPON: 1,
  ITEM_FLAG_EXPOSE_ASS: 11,
  ITEM_FLAG_EXPOSE_CHEST: 9,
  ITEM_FLAG_EXPOSE_FULL: 6,
  ITEM_FLAG_EXPOSE_GROIN: 10,
  ITEM_FLAG_FIXED_EQUIPMENT: 56,
  ITEM_FLAG_HEATBELT: 12,
  ITEM_FLAG_HEAT_GENERATOR: 13,
  ITEM_FLAG_HIGH_PHYSIQUE: 27,
  ITEM_FLAG_INTERNAL_POWER: 16,
  ITEM_FLAG_LAUNCHER_WEAPON: 40,
  ITEM_FLAG_LIGHT_AUTOSTIM: 55,
  ITEM_FLAG_LUST_WEAPON: 7,
  ITEM_FLAG_MAX: 58,
  ITEM_FLAG_MEDICINE: 52,
  ITEM_FLAG_NAMES: {
    0: 'Bow Weapon',
    1: 'Energy Weapon',
    2: 'Non-consumable',
    3: 'Bonus Hit Rate',
    4: 'Airtight',
    5: 'Swimwear',
    6: 'Fully Exposed',
    7: 'Lust Weapon',
    8: 'Power Armor',
    9: 'Chest Exposed',
    10: 'Groin Exposed',
    11: 'Ass Exposed',
    12: 'Heat Belt',
    13: 'Heat Generator',
    14: 'Reduces Accuracy',
    15: 'Combat Drone',
    16: 'Self-Powered',
    17: 'Undroppable',
    18: 'Transparent',
    19: 'Anti-Gravity',
    20: 'Ignores Blindness',
    21: 'Covers Body',
    22: 'Body Conforming',
    23: 'Vaginal Chastity',
    24: 'Anal Chastity',
    25: 'Vaginal Cum-Sealed',
    26: 'Anal Cum-Sealed',
    27: 'Requires High Physique',
    28: 'Multiples',
    29: 'Stud',
    30: 'Ring',
    31: 'Chained',
    32: 'Permanent',
    33: 'Requires Small Cock',
    34: 'Shelter',
    35: 'Stretchable',
    36: 'Rifle',
    37: 'Pistol',
    38: 'Shotgun',
    39: 'Thrower',
    40: 'Launcher',
    41: 'Disabled',
    42: 'Double Shot',
    43: 'Burst Fire',
    44: 'Full-Auto Fire',
    45: 'Ship Equipment',
    46: 'Crewed Turret',
    47: 'Bar',
    48: 'Hoop',
    49: 'Cocksock',
    50: 'Cockring',
    51: 'Alcoholic',
    52: 'Medicine',
    53: 'Pressurized',
    54: 'Classy',
    55: 'Light Auto-Stim',
    57: 'Unsellable',
  },
  ITEM_FLAG_NO_REMOVE: 32,
  ITEM_FLAG_PIERCING_BAR: 47,
  ITEM_FLAG_PIERCING_CHAINS: 31,
  ITEM_FLAG_PIERCING_HOOP: 48,
  ITEM_FLAG_PIERCING_MULTIPLE: 28,
  ITEM_FLAG_PIERCING_RING: 30,
  ITEM_FLAG_PIERCING_STUD: 29,
  ITEM_FLAG_PISTOL_WEAPON: 37,
  ITEM_FLAG_POWER_ARMOR: 8,
  ITEM_FLAG_PRESSURIZED: 53,
  ITEM_FLAG_QUADSHOT: 44,
  ITEM_FLAG_REDUCED_ACCURACY: 14,
  ITEM_FLAG_RIFLE_WEAPON: 36,
  ITEM_FLAG_SHELTER: 34,
  ITEM_FLAG_SHIP_EQUIPMENT: 45,
  ITEM_FLAG_SHOTGUN_WEAPON: 38,
  ITEM_FLAG_SKIN_TIGHT: 22,
  ITEM_FLAG_SMALL_DICK_ONLY: 33,
  ITEM_FLAG_STRETCHY: 35,
  ITEM_FLAG_SWIMWEAR: 5,
  ITEM_FLAG_THROWER_WEAPON: 39,
  ITEM_FLAG_TOGGLED_OFF: 41,
  ITEM_FLAG_TRANSPARENT: 18,
  ITEM_FLAG_TURRET: 46,
  ITEM_FLAG_TWINSHOT: 42,
  ITEM_FLAG_UNDROPPABLE: 17,
  ITEM_FLAG_UNSELLABLE: 57,
  ITEM_FLAG_VAGINALLY_SEALED: 25,
  ITEM_FLAG_VAGINAL_CHASTITY: 23,
  ITEM_RARITY_NAMES: {0: 'Common', 1: 'Rare', 2: 'Custom'},
  ITEM_TYPE_NAMES: {
    0: 'Pill',
    1: 'Food',
    2: 'Potion',
    3: 'Melee Weapon',
    4: 'Ranged Weapon',
    5: 'Armor',
    6: 'Shield',
    7: 'Upper Undergarment',
    8: 'Lower Undergarment',
    9: 'Accessory',
    10: 'Drug',
    11: 'Clothing',
    12: 'All',
    13: 'Gadget',
    14: 'Explosive',
    15: 'Quest Item',
    16: 'Gem',
    17: 'Sex Toy',
    18: 'Piercing',
    19: 'Cockwear',
    20: 'Tent',
    21: 'Combat Implant',
    22: 'Utility Implant',
    23: 'Decoration',
  },
  KINDA_DISLIKES_SEXPREF: 0.8,
  KINDA_LIKES_SEXPREF: 1.25,
  KQ2_NUKE_DURATION: 90,
  LIEVE_LATEGOODBYE_COMPLETE: 3,
  LIEVE_LATEGOODBYE_NO: 1,
  LIEVE_LATEGOODBYE_YES: 2,
  LOWER_UNDERGARMENT: 8,
  MAX_FLUID_TYPES: 31,
  MAX_SEXPREF_VALUE: 33,
  MELEE_WEAPON: 3,
  MIMBRANE_EFFECTS: [
    'Mimbrane Cock',
    'Mimbrane Pussy',
    'Mimbrane Ass',
    'Mimbrane Balls',
    'Mimbrane Boobs',
    'Mimbrane Hand Left',
    'Mimbrane Hand Right',
    'Mimbrane Foot Left',
    'Mimbrane Foot Right',
    'Mimbrane Face',
  ],
  NIPPLE_TYPE_DICK: 3,
  NIPPLE_TYPE_FLAT: 4,
  NIPPLE_TYPE_FUCKABLE: 1,
  NIPPLE_TYPE_INVERTED: 5,
  NIPPLE_TYPE_LIPPLES: 2,
  NIPPLE_TYPE_NAMES: {0: 'Normal', 1: 'Cunt', 2: 'Lip', 3: 'Dick', 4: 'Flat', 5: 'Inverted', 6: 'Tentacled'},
  NIPPLE_TYPE_NORMAL: 0,
  NIPPLE_TYPE_TENTACLED: 6,
  NOT_CONSUMED_BY_DEFAULT: 2,
  NYREA_ALPHA: 1,
  NYREA_BETA: 2,
  NYREA_UNKNOWN: 0,
  OIL_COOL: 1,
  OIL_LUST: 3,
  OIL_NUMB: 2,
  OIL_SLIP: 4,
  OIL_SOURCE_SPECIAL_MASSAGE: 'special massage',
  OIL_SOURCE_STANDARD_MASSAGE: 'standard massage',
  OIL_STATUS_NAMES: ['Oil Warmed', 'Oil Cooled', 'Oil Numbed', 'Oil Aroused', 'Oil Slicked'],
  OIL_WARM: 0,
  PIERCING: 18,
  PILL: 0,
  POTION: 2,
  PREGSLOT_ANY: 0,
  PREGSLOT_ASS: 2,
  PREGSLOT_NONE: 99,
  PREGSLOT_VAG: 1,
  QUEST_ITEM: 15,
  RANGED_WEAPON: 4,
  RARE: 1,
  REAHA_ADDICTION_HIGH: 65,
  REAHA_ADDICTION_LOW: 15,
  REAHA_ADDICTION_MAX: 100,
  REAHA_ADDICTION_MED: 40,
  REAHA_CONFIDENCE_HIGH: 65,
  REAHA_CONFIDENCE_LOW: 15,
  REAHA_CONFIDENCE_MED: 40,
  REALLY_DISLIKES_SEXPREF: 0.666666666,
  REALLY_LIKES_SEXPREF: 1.5,
  RECRUITED_CELISE: 0,
  REGULAR_FEED_MIMBRANES: ['Mimbrane Cock', 'Mimbrane Pussy', 'Mimbrane Ass', 'Mimbrane Boobs', 'Mimbrane Face'],
  SELECTABLE_ARTISTS: ['NONE', 'ADJATHA', 'CHESHIRE', 'GATS', 'GATSOLD', 'JACQUES', 'SHOU'],
  SEXPREF_BALDNESS: 24,
  SEXPREF_BALLS: 11,
  SEXPREF_BIG_BREASTS: 5,
  SEXPREF_BIG_BUTTS: 3,
  SEXPREF_BIG_MALEBITS: 12,
  SEXPREF_CHITIN: 32,
  SEXPREF_COCKS: 9,
  SEXPREF_CUMMY: 28,
  SEXPREF_DESCRIPTORS: {
    0: 'Feminine faces',
    1: 'Masculine faces',
    2: 'Hermaphrodites',
    3: 'Big butts',
    4: 'Small butts',
    5: 'Big breasts',
    6: 'Small breasts',
    7: 'Wide hips',
    8: 'Narrow hips',
    9: 'Penises',
    10: 'Vaginas',
    11: 'Balls',
    12: 'Big masculine endowments',
    13: 'Petite masculine endowments',
    14: 'Multiple sex organs or breasts',
    15: 'Hypersized attributes',
    16: 'Gaped orifices',
    17: 'Wet vaginas',
    18: 'Less lubricated vaginas',
    19: 'Tails',
    20: 'Tail genitalia',
    21: 'Lactation',
    22: 'Nipplecunts',
    23: 'Exotic bodyshapes like nagas and taurs',
    24: 'Baldness',
    25: 'Long hair',
    26: 'Neuters',
    27: 'Sweat',
    28: 'Sexjuice coatings',
    29: 'Furries',
    30: 'Scalies',
    31: 'Feathers',
    32: 'Chitin',
    33: 'ERROR ERROR ABORT ABORT',
  },
  SEXPREF_EXOTIC_BODYSHAPE: 23,
  SEXPREF_FEATHERS: 31,
  SEXPREF_FEMININE: 0,
  SEXPREF_FURRIES: 29,
  SEXPREF_GAPE: 16,
  SEXPREF_HERMAPHRODITE: 2,
  SEXPREF_HYPER: 15,
  SEXPREF_LACTATION: 21,
  SEXPREF_LONG_HAIR: 25,
  SEXPREF_MASCULINE: 1,
  SEXPREF_MULTIPLES: 14,
  SEXPREF_NARROW_HIPS: 8,
  SEXPREF_NEUTER: 26,
  SEXPREF_NIPPLECUNTS: 22,
  SEXPREF_PUSSIES: 10,
  SEXPREF_SCALIES: 30,
  SEXPREF_SMALL_BREASTS: 6,
  SEXPREF_SMALL_BUTTS: 4,
  SEXPREF_SMALL_MALEBITS: 13,
  SEXPREF_SWEAT: 27,
  SEXPREF_TAILGENITALS: 20,
  SEXPREF_TAILS: 19,
  SEXPREF_VAGINAL_DRYNESS: 18,
  SEXPREF_VAGINAL_WETNESS: 17,
  SEXPREF_VALUES: [1.5, 1.25, 0.8, 0.666666666],
  SEXPREF_WIDE_HIPS: 7,
  SEXTOY: 17,
  SHIELD: 6,
  SILLY_ITEM_RARITY_NAMES: {0: 'Jank', 1: 'Dank', 2: 'Tits'},
  SKIN_TYPE_BARK: 8,
  SKIN_TYPE_CHITIN: 4,
  SKIN_TYPE_FEATHERS: 5,
  SKIN_TYPE_FUR: 1,
  SKIN_TYPE_GEL: 9,
  SKIN_TYPE_GOO: 3,
  SKIN_TYPE_LATEX: 6,
  SKIN_TYPE_NAMES: {0: 'Skin', 1: 'Fur', 2: 'Scales', 3: 'Goo', 4: 'Chitin', 5: 'Feathers', 6: 'Latex', 7: 'Plant', 8: 'Bark', 9: 'Gel'},
  SKIN_TYPE_PLANT: 7,
  SKIN_TYPE_SCALES: 2,
  SKIN_TYPE_SKIN: 0,
  STATUS_BAD: 'var(--negativeColor)',
  STATUS_CAUTION: 'var(--cautionColor)',
  STATUS_DEBUG: 'var(--debugColor)',
  STATUS_ENERGY_DOWN: 'var(--energyDamageColor)',
  STATUS_ENERGY_UP: 'var(--energyHealColor)',
  STATUS_GOOD: 'var(--positiveColor)',
  STATUS_HORNY: 'var(--passiveColor)',
  STATUS_HP_DOWN: 'var(--hpDamageColor)',
  STATUS_HP_UP: 'var(--hpHealColor)',
  STATUS_LOW_PRIORITY: 'var(--lowPriorityColor)',
  STATUS_LUST_DOWN: 'var(--lustDamageColor)',
  STATUS_LUST_UP: 'var(--lustHealColor)',
  STATUS_NEUTRAL: 'var(--textColor)',
  STATUS_PASSIVE: 'var(--passiveColor)',
  STATUS_SHIELD_DOWN: 'var(--shieldDamageColor)',
  STATUS_SHIELD_UP: 'var(--shieldHealColor)',
  STEPH_WORK_DISCOURAGE: 3,
  STEPH_WORK_NEWNETWORK: 2,
  STEPH_WORK_PORNSTAR: 1,
  TAIL_GENITAL_COCK: 1,
  TAIL_GENITAL_HERM: 2,
  TAIL_GENITAL_NONE: 0,
  TAIL_GENITAL_TYPES: [0, 1, 2, 3],
  TAIL_GENITAL_VAGINA: 3,
  TAIL_GENTIAL_TYPE_NAMES: {0: 'None', 1: 'Cock', 2: 'Both', 3: 'Vagina'},
  TENT: 20,
  TIMES_CELISE_IN_BALLS: 2,
  TYPE_ADREMMALEX: 80,
  TYPE_ANEMONE: 22,
  TYPE_ARACHNID: 7,
  TYPE_AVIAN: 10,
  TYPE_BADGER: 45,
  TYPE_BEE: 6,
  TYPE_BOTHRIOC: 69,
  TYPE_BOVINE: 2,
  TYPE_CANINE: 3,
  TYPE_CENTAUR: 1,
  TYPE_COCKVINE: 54,
  TYPE_CUNDARIAN: 92,
  TYPE_CUNTSNAKE: 33,
  TYPE_DARK_SYLVAN: 59,
  TYPE_DAYNAR: 53,
  TYPE_DEER: 21,
  TYPE_DEMONIC: 15,
  TYPE_DOGGIE: 29,
  TYPE_DOVE: 28,
  TYPE_DRACONIC: 11,
  TYPE_DRAGONFLY: 31,
  TYPE_DRIDER: 8,
  TYPE_DRYAD: 30,
  TYPE_DZAAN: 90,
  TYPE_EQUINE: 1,
  TYPE_FELINE: 4,
  TYPE_FLOWER: 67,
  TYPE_FROG: 14,
  TYPE_FROSTWYRM: 82,
  TYPE_GABILANI: 18,
  TYPE_GOAT: 50,
  TYPE_GOOEY: 16,
  TYPE_GRYVAIN: 65,
  TYPE_HRAD: 64,
  TYPE_HUMAN: 0,
  TYPE_HUMANMASKED: 25,
  TYPE_HYENA: 89,
  TYPE_INHUMAN: 56,
  TYPE_JANERIA: 85,
  TYPE_KANGAROO: 17,
  TYPE_KORGONNE: 66,
  TYPE_KUITAN: 24,
  TYPE_LAPINARA: 44,
  TYPE_LAPINE: 9,
  TYPE_LEITHAN: 49,
  TYPE_LION: 93,
  TYPE_LIZAN: 12,
  TYPE_LUPINE: 75,
  TYPE_MILODAN: 70,
  TYPE_MIMBRANE: 41,
  TYPE_MLP: 32,
  TYPE_MOOSE: 94,
  TYPE_MOTHRINE: 81,
  TYPE_MOUSE: 26,
  TYPE_MOUSEMAN: 27,
  TYPE_MOUTHGINA: 74,
  TYPE_MYR: 60,
  TYPE_NAGA: 13,
  TYPE_NALEEN: 39,
  TYPE_NALEEN_FACE: 39,
  TYPE_NAMES: {
    0: 'Human',
    1: 'Equine',
    2: 'Bovine',
    3: 'Canine',
    4: 'Feline',
    5: 'Vulpine',
    6: 'Bee',
    7: 'Arachnid',
    8: 'Drider',
    9: 'Lapine',
    10: 'Avian',
    11: 'Draconic',
    12: 'Lizan',
    13: 'Naga',
    14: 'Frog',
    15: 'Demonic',
    16: 'Gooey',
    17: 'Kangaroo',
    18: 'Gabilani',
    19: 'Shark',
    20: 'Suula',
    21: 'Deer',
    22: 'Anemone',
    23: 'Tentacle',
    24: 'Kui-tan',
    25: 'Human Masked',
    26: 'Mouse',
    27: 'Mouseman',
    28: 'Dove',
    29: 'Floppy Dog',
    30: 'Dryad',
    31: 'Dragonfly',
    32: 'MLP',
    33: 'Cuntsnake',
    34: 'Venus Pitcher',
    35: 'Succubus',
    36: 'Small Bee',
    37: 'Small Demonic',
    38: 'Small Draconic',
    39: 'Naleen',
    40: 'Panda',
    41: 'Mimbrane',
    42: 'Raskvel',
    43: 'Sydian',
    44: 'Lapinara',
    45: 'Badger',
    46: 'Vanae',
    47: 'Vanae Maiden',
    48: 'Vanae Huntress',
    49: 'Leithan',
    50: 'Goat',
    51: 'Synthetic',
    52: 'Simii',
    53: 'Daynar',
    54: 'Cockvine',
    55: 'Nyrea',
    56: 'Inhuman',
    57: 'Ovir',
    58: 'Sylvan',
    59: 'Dark Sylvan',
    60: 'Myr',
    61: 'Saurian',
    62: 'Rhino',
    63: 'Narwhal',
    64: 'Hradian',
    65: 'Gryvain',
    66: 'Korgonne',
    67: 'Flower',
    68: 'Water Queen',
    69: 'Bothrioc',
    70: 'Milodan',
    71: 'Worg',
    72: 'Swine',
    73: 'Quad Lapine',
    74: 'Mouthgina',
    75: 'Lupine',
    76: 'Sheep',
    77: 'Lesser Panda',
    78: 'Rahn',
    79: 'Thraggen',
    80: 'Adremmalex',
    81: 'Mothrine',
    82: 'Frostwyrm',
    83: 'Sand Worm',
    84: 'Butt Bug',
    85: 'Janeria',
    86: 'Roehm',
    87: 'Xhelarfog',
    88: 'Saurmorian',
    89: 'Hyena',
    90: 'Dzaan',
    91: 'Zaika',
    92: 'Cundarian',
    93: 'Lion',
    94: 'Moose',
  },
  TYPE_NARWHAL: 63,
  TYPE_NYREA: 55,
  TYPE_OVIR: 57,
  TYPE_PANDA: 40,
  TYPE_QUAD_LAPINE: 73,
  TYPE_RAHN: 78,
  TYPE_RASKVEL: 42,
  TYPE_REDPANDA: 77,
  TYPE_RHINO: 62,
  TYPE_ROEHM: 86,
  TYPE_SANDWORM: 83,
  TYPE_SANDWORM_PARASITE: 84,
  TYPE_SAURIAN: 61,
  TYPE_SAURMORIAN: 88,
  TYPE_SHARK: 19,
  TYPE_SHEEP: 76,
  TYPE_SIMII: 52,
  TYPE_SIONACH: 95,
  TYPE_SIREN: 20,
  TYPE_SMALLBEE: 36,
  TYPE_SMALLDEMONIC: 37,
  TYPE_SMALLDRACONIC: 38,
  TYPE_SNAKE: 13,
  TYPE_SUCCUBUS: 35,
  TYPE_SUULA: 20,
  TYPE_SWINE: 72,
  TYPE_SYDIAN: 43,
  TYPE_SYLVAN: 58,
  TYPE_SYNTHETIC: 51,
  TYPE_TANUKI: 24,
  TYPE_TENTACLE: 23,
  TYPE_THRAGGEN: 79,
  TYPE_VANAE: 46,
  TYPE_VANAE_HUNTRESS: 48,
  TYPE_VANAE_MAIDEN: 47,
  TYPE_VENUSPITCHER: 34,
  TYPE_VULPINE: 5,
  TYPE_WATERQUEEN: 68,
  TYPE_WORG: 71,
  TYPE_XHELARFOG: 87,
  TYPE_ZAIKA: 91,
  UPBRINGING_ATHLETIC: 1,
  UPBRINGING_AUSTERE: 3,
  UPBRINGING_BALANCED: 4,
  UPBRINGING_BOOKWORM: 2,
  UPBRINGING_NAMES: {0: 'Pampered', 1: 'Athletic', 2: 'Bookworm', 3: 'Austere', 4: 'Balanced', 5: 'Slutty'},
  UPBRINGING_PAMPERED: 0,
  UPBRINGING_SLUTTY: 5,
  UPPER_UNDERGARMENT: 7,
  UTILITY_IMPLANT: 22,
  // we don't actually use these (for now!)
  VALID_ANTENNAE_TYPES: [],
  VALID_AREOLA_FLAGS: [],
  VALID_ARM_FLAGS: [],
  VALID_ARM_TYPES: [],
  VALID_ARTISTS: [],
  VALID_ARTISTS_NAMES: [],
  VALID_COCK_FLAGS: [],
  VALID_COCK_TYPES: [],
  VALID_CUM_TYPES: [],
  VALID_DICKNIPPLE_TYPES: [],
  VALID_EAR_TYPES: [],
  VALID_EYE_TYPES: [],
  VALID_FACE_FLAGS: [],
  VALID_FACE_TYPES: [],
  VALID_GENITAL_SPOTS: [],
  VALID_GIRLCUM_TYPES: [],
  VALID_HORN_TYPES: [],
  VALID_LEG_FLAGS: [],
  VALID_LEG_TYPES: [],
  VALID_MILK_TYPES: [],
  VALID_NIPPLE_TYPES: [],
  VALID_SKIN_FLAGS: [],
  VALID_TAIL_FLAGS: [],
  VALID_TAIL_GENITAL_ARGS: [],
  VALID_TAIL_TYPES: [],
  VALID_TONGUE_FLAGS: [],
  VALID_TONGUE_TYPES: [],
  VALID_VAGINA_FLAGS: [],
  VALID_VAGINA_TYPES: [],
  VALID_WING_TYPES: [],
};

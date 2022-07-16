'use strict';
// Inject jQuery
// TiTs comes with a selector mechanism that is similar, but we need it all
// otherwise this script will end up annoying to write.
(function () {
  var jq = document.createElement("script");
  jq.id = "te_jquery";
  jq.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  document.head.appendChild(jq);
})();

// Inject TiTsEdJS
setTimeout(function () {
  //helper functions
  function makeInput(id, type, name) {
    return '<label for="' + id + '">'+name+'</label><input id="'+id+'" type="'+type+'"><br>';
  }
  function makeCombo(id, name, data, keys=null) {
    const label = '<label for="' + id + '">'+name+'</label><select id="'+id+'">';
    if(keys == null) {
      keys = Object.keys(data);
    }
    var options = '';
    for(var i = 0; i < keys.length; ++i) {
      options += '<option value="'+keys[i]+'">'+String(data[keys[i]])+'</option>';
    }
    return label + options + '</select><br>';
  }

  // remove the loader
  jQuery('#te_loader').remove();
  jQuery('body').append(`<div id="titsed">
  <h3>TiTsEdJS PoC</h3>
  <div id="te_data"></div>
  <table><tr>
		<td><button id="te_load">Load</button></td>
		<td><button id="te_save">Save</button></td>
	</tr></table>
	<button id="te_close">Close</button>
	</div>`);
  jQuery("head").append(`<style id="te_style">
		#titsed{
			width:200px;
			background:var(--lightBackgroundColor);
			border:1px solid var(--shadowColor);
			padding:1ex;
			position:fixed;
			right:0px;
		}
		#titsed>h4{margin:1ex;text-align:center;}
    #titsed>table{width:100%;}
		#titsed input,#titsed button{width:100%;}
	</style>`);
  //construct tables
  const ted = jQuery("#te_data");
  ted.append("<h4>Profile</h4>");
  ted.append(makeInput('te_credits','number','Credits'));
  ted.append(makeInput('te_height','number','Height'));
  ted.append(makeInput('te_personality','number','Personality'));

  ted.append("<h4>Head</h4>");
  ted.append(makeInput('te_fem','number','Femininity'));
  ted.append(makeCombo('te_face','Face', GLOBAL.TYPE_NAMES, GLOBAL.VALID_FACE_TYPES));
  ted.append(makeCombo('te_ear','Ear', GLOBAL.TYPE_NAMES, GLOBAL.VALID_EAR_TYPES));
  ted.append(makeInput('te_ear_size','number','Ear Size'));
  ted.append(makeCombo('te_eye','Eye', GLOBAL.TYPE_NAMES, GLOBAL.VALID_EYE_TYPES));
  ted.append(makeCombo('te_tongue','Tongue', GLOBAL.TYPE_NAMES, GLOBAL.VALID_TONGUE_TYPES));

  ted.append("<h4>Body</h4>");
  ted.append(makeInput('te_tone','number','Tone'));
  ted.append(makeInput('te_thick','number','Thickness'));
  ted.append(makeCombo('te_arm','Arm', GLOBAL.TYPE_NAMES, GLOBAL.VALID_ARM_TYPES));

  ted.append(makeInput('te_legs','number','Legs'));
  ted.append(makeCombo('te_leg','Leg', GLOBAL.TYPE_NAMES, GLOBAL.VALID_LEG_TYPES));

  ted.append(makeInput('te_tails','number','Tails'));
  ted.append(makeCombo('te_tail','Tail', GLOBAL.TYPE_NAMES, GLOBAL.VALID_TAIL_TYPES));

  ted.append("<h4>Ass</h4>");

  //attach items
  jQuery('#te_load').on('click', function () {
    //profile
    jQuery('#te_credits').val(pc.credits);
    jQuery('#te_height').val(pc.tallness);
    jQuery('#te_personality').val(pc.personality);
    //head
    jQuery('#te_fem').val(pc.femininity);
    jQuery('#te_face').val(pc.faceType);
    jQuery('#te_ear').val(pc.earType);
    jQuery('#te_ear_size').val(pc.earLength);
    jQuery('#te_eye').val(pc.eyeType);
    jQuery('#te_tongue').val(pc.tongueType);
    //body
    jQuery('#te_tone').val(pc.tone);
    jQuery('#te_thick').val(pc.thickness);
    jQuery('#te_arm').val(pc.armType);
    jQuery('#te_legs').val(pc.legCount);
    jQuery('#te_leg').val(pc.legType);
    jQuery('#te_tails').val(pc.tailCount);
    jQuery('#te_tail').val(pc.tailType);
  });
  jQuery('#te_save').on('click', function () {
    //profile
    pc.credits = Number(jQuery('#te_credits').val());
    pc.tallness = Number(jQuery('#te_height').val());
    pc.personality = Number(jQuery('#te_personality').val());
    //head
    pc.femininity = Number(jQuery('#te_fem').val());
    pc.faceType = Number(jQuery('#te_face').val());
    pc.earType = Number(jQuery('#te_ear').val());
    pc.earLength = Number(jQuery('#te_ear_size').val());
    pc.eyeType = Number(jQuery('#te_eye').val());
    pc.tongueType = Number(jQuery('#te_tongue').val());
    //body
    pc.tone = Number(jQuery('#te_tone').val());
    pc.thickness = Number(jQuery('#te_thick').val());
    pc.armType = Number(jQuery('#te_arm').val());
    pc.legCount = Number(jQuery('#te_legs').val());
    pc.legType = Number(jQuery('#te_leg').val());
    pc.tailCount = Number(jQuery('#te_tails').val());
    pc.tailType = Number(jQuery('#te_tail').val());
  });
  jQuery('#te_close').on('click', function () {
    jQuery('#titsed').remove();
    jQuery('#te_style').remove();
    jQuery('#te_jquery').remove();
  });
}, 500);

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
  jQuery('body').append(`<div id="titsed">
  <h4>TiTsEdJS PoC</h4>
	<table><tr>
		<td>Height</td>
		<td><input type="number" id="te_tallness"></td>
	</tr><tr>
		<td>Tone</td>
		<td><input type="number" id="te_tone"></td>
	</tr><tr>
		<td>Femininity</td>
		<td><input type="number" id="te_fem"></td>
	</tr><tr>
		<td>Thickness</td>
		<td><input type="number" id="te_thick"></td>
	</tr><tr>
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
		#titsed>h4{margin:1ex;text-align: center;}
		#titsed input,#titsed button{width: 100%;}
	</style>`);
  //attach items
  jQuery('#te_load').on('click', function () {
    jQuery('#te_tallness').val(pc.tallness);
    jQuery('#te_tone').val(pc.tone);
    jQuery('#te_fem').val(pc.femininity);
    jQuery('#te_thick').val(pc.thickness);
  });
  jQuery('#te_save').on('click', function () {
    pc.tallness = Number(jQuery('#te_tallness').val());
    pc.tone = Number(jQuery('#te_tone').val());
    pc.femininity = Number(jQuery('#te_fem').val());
    pc.thickness = Number(jQuery('#te_thick').val());
  });
  jQuery('#te_close').on('click', function () {
    jQuery('#titsed').remove();
    jQuery('#te_style').remove();
    jQuery('#te_jquery').remove();
  });
}, 500);

/**
 * This file initializes div classes
 *
 * @class main
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var main = function ( $ ) {

	/* *************************************
	 * Public Functions / Initialization
	 * *************************************/

	return {
		init : function() {
			ajax.init();
			websocket.init();
			recipe.init();
		}
	};

}( jQuery );


jQuery(document).ready(function() {
	main.init();
});

jQuery(window).load(function(){
	document.addEventListener("backbutton", cordova.init() , false);

	sidebar.init();
});



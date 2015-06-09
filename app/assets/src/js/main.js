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
			sidebar.init();
		}
	};

}( jQuery );


jQuery(document).ready(function() {

	function onBackKeyDown() {
		var content = $('#content');

		if (content.hasClass('home')) {
			navigator.app.exitApp();
		} else if (content.hasClass('setBet')) {
			ajax.loadBets();
		} else {
			ajax.loadHome();
		}
	}

	document.addEventListener("backbutton", onBackKeyDown, false);

	main.init();
});




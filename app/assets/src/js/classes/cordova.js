/**
 * This file handels cordova settings
 *
 * @class cordova
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var cordova = (function ($) {

	/**
	 * Initializing function
	 */
	function init() {

		var content = $('#content');

		if (content.hasClass('home')) {
			navigator.app.exitApp();
		} else if (content.hasClass('setBet')) {
			ajax.loadBets();
		} else {
			ajax.loadHome();
		}
	}

	return {
		init: function () {
			init();
		}
	};

})(jQuery);
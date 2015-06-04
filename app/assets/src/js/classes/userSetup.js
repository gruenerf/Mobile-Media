/**
 * This file handels the first start of the app
 *
 * @class userSetup
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var userSetup = (function ($) {

	/**
	 * Initializing function
	 */
	function init() {

		if (!localStorage.userHash) {
			localStorage.userHash = randomString(40, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		}

	}

	/**
	 * Generate a random String
	 * @param length
	 * @param chars
	 * @returns {string}
	 */
	function randomString(length, chars) {
		var result = '';
		for (var i = length; i > 0; --i) {
			result += chars[Math.round(Math.random() * (chars.length - 1))];
		}
		return result;
	}

	return {
		init: function () {
			init();
		}
	};

})(jQuery);
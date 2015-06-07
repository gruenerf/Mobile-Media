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

	}

	/**
	 * Loads countries to setup login screen
	 */
	function loadCountries() {

		// Read countries out of localStorage
		var string = "";
		var countries = JSON.parse(localStorage.countries_json);

		console.log(countries);

		// If countries exist
		$.each(countries, function(i,v) {
			string += "<option value=\"{'id':'" + v.id + "','name':'" + v.name + "'}\">" + v.name + "</option>";
		});

		// Append the options to the select box
		$("#countries").append(string);

		// If country gets submitted
		$("#continue_button").on("click", function () {

			// Get selected country
			var countryval = $('#countries').val();

			if (countryval !== null) {

				// Store country id and name in localstorage
				var country = JSON.parse(countryval.replace(/'/g, "\""));

				var countryName = country.name;
				localStorage.countryId = country.id;
				localStorage.countryName = countryName;


				// Generate Userhash
				var userHash = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
				localStorage.userHash = userHash;

				websocket.createUser(userHash, countryName);
			}
			else {
				var error = $("#login_error");
				error.show().empty().append('You have to select a country.');
			}
		});
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
		},
		loadCountries: function () {
			loadCountries();
		}
	};

})(jQuery);
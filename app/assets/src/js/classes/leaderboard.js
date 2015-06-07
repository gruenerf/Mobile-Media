/**
 * This file handels all functions related to the leaderboard
 *
 * @class leaderboard
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var leaderboard = (function ($) {


	function getLeaderboard() {

		var leaderboard = $("#leaderboard");
		// Stringbuffer for inserted html
		var string = "";

		if (localStorage.leaderboard_json) {

			// Checks if own country is in leaderboard
			var check = false;
			var counter = 1;

			var leaderboardJson = JSON.parse(localStorage.leaderboard_json);
			$.each(leaderboardJson, function (i, v) {
				if (v.country === localStorage.countryId) {
					check = true;
				}

				var countries = JSON.parse(localStorage.countries_json);
				$.each(countries, function (index, val) {
					if (val.id === v.country) {
						string += "<tr>" +
						"<td>" + counter + "</td>" +
						"<td>" + val.name + "</td>" +
						"<td>" + v.gold + "</td>" +
						"<td>" + v.silver + "</td>" +
						"<td>" + v.bronze + "</td>" +
						"</tr>";

						counter++;
						return false;
					}
				});
			});

			if (!check) {
				string += "<tr>" +
				"<td>" + counter + "</td>" +
				"<td>" + localStorage.countryName + "</td>" +
				"<td>0</td>" +
				"<td>0</td>" +
				"<td>0</td>" +
				"</tr>";
			}

			leaderboard.append(string);
		}
	}

	/**
	 * Returns the amount of medals of the selected country
	 *
	 * @returns {{gold: string, silver: string, bronze: string}}
	 */
	function getMedals() {

		var response = {"gold": "0", "silver": "0", "bronze": "0"};

		if (localStorage.leaderboard_json) {
			var leaderboard = JSON.parse(localStorage.leaderboard_json);

			$.each(leaderboard, function (i, v) {
				if (v.country === localStorage.countryId) {
					response = {"gold": v.gold, "silver": v.silver, "bronze": v.bronze};
				}
			});
		}

		return response;
	}

	return {
		getLeaderboard: function () {
			getLeaderboard();
		},
		getMedals: function () {
			return getMedals();
		}
	};

})(jQuery);

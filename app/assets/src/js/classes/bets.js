/**
 * This file handels all functions related to the events
 *
 * @class bets
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var bets = (function ($) {

	/**
	 * Function that defines the difference between two dates
	 * @param datepart
	 * @param fromDate
	 * @param toDate
	 * @returns {number}
	 */
	function dateDiff(datepart, fromDate, toDate) {
		datepart = datepart.toLowerCase();

		//Difference in milliseconds
		var diff = toDate - fromDate;

		var divideBy = {
			w: 604800000,
			d: 86400000,
			h: 3600000,
			n: 60000,
			s: 1000
		};

		return Math.floor(diff / divideBy[datepart]) + 1;
	}

	/**
	 * Initializing function
	 */
	function init() {
		var body = $("body");

		body.on('click', ".bet", function () {
			ajax.loadSetBet($(this).data("name"), $(this).data("id"));
		});

		body.on('click', '#bet_button', function () {

			// Get selected country
			var eventId = $(this).data("id");
			var countryVal = $('#bet_countries').val();
			var tokenVal = $('#set_tokens').val();

			// Empty error
			var error = $('#bet_error');
			error.empty();

			if (countryVal !== null && tokenVal !== "") {
				// Store country id and name in localstorage
				var country = JSON.parse(countryVal);
				var countryId = country.id;

				if (tokenVal <= localStorage.tokens) {
					websocket.setBet(eventId, countryId, tokenVal);
				} else {
					error.show().append('You can´t bet more tokens than you have.');
				}
			} else {
				error.show().append('You have to fill out both fields.');
			}
		});
	}

	/**
	 * Reutns all events
	 */
	function getEvents() {
		var events = $("#events");

		// Stringbuffer for inserted html
		var string = "";

		if (localStorage.events_json) {

			var eventsJson = JSON.parse(localStorage.events_json);
			$.each(eventsJson, function (i, v) {

				// Only if dates are in the future
				if(dateDiff("s", new Date(), new Date(v.date)) > 0){
					//Check if bet already exists
					var betsJson = JSON.parse(localStorage.bets_json);
					var exists = false;

					$.each(betsJson, function (index, val) {
						if (val.event_id === v.event_id) {
							exists = true;
							return true;
						}
					});

					if (exists) {
						string += "<tr class='exists'>";
					}
					else {
						string += "<tr>";
					}
					string += "<td>" + v.eventName + "</td>" +
					"<td>" + $.formatDateTime('dd.mm.y gg:ii:ss', new Date(v.date)) + "</td>";

					if (!exists) {
						string += "<td><img src='assets/dist/img/bets.png' data-name='" + v.eventName +
						"' data-id='" + v.event_id + "' class='bet'></td>";
					} else {
						string += "<td>Set</td>";
					}

					string += "</tr>";
				}
			});

			events.append(string);
		}
	}

	return {
		getEvents: function () {
			getEvents();
			init();
		}
	};

})(jQuery);

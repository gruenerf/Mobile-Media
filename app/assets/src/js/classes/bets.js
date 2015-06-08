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
	 * Initializing function
	 */
	function init() {
		var body = $("body");

		body.on('click', ".bet", function () {
			ajax.loadSetBet($(this).data("name"), $(this).data("id"));
		});
	}


	function setBet(){
		var body = $("body");

		body.on('click', '#bet_button', function(){
			// Get selected country
			var countryVal = $('#countries').val();
			var tokenVal = $('#tokens').val();

			if (countryVal !== null) {

				// Store country id and name in localstorage
				var country = JSON.parse(countryVal.replace(/'/g, "\""));

				var countryId = country.id;
			}else {
				var error = $("#login_error");
				error.show().empty().append('You have to select a country.');
			}
		});
	}

	/**
	 * Todo
	 *
	 * Show all events
	 * Put betting option ext to them
	 * if clicked how much do you want to bet / country
	 * bet
	 *
	 * mark the betted ones
	 * mark the won ones and the lost ones
	 *
	 * make description for bets
	 */
	function getEvents() {
		var events = $("#events");

		// Stringbuffer for inserted html
		var string = "";

		if (localStorage.events_json) {

			var eventsJson = JSON.parse(localStorage.events_json);
			$.each(eventsJson, function (i, v) {

				string += "<tr>" +
				"<td>" + v.eventName + "</td>" +
				"<td>" + $.formatDateTime('dd.mm.y gg:ii:ss', new Date(v.date)) + "</td>" +
				"<td><img src='assets/dist/img/bets.png' data-name='" + v.eventName +
				"' data-id='" + v.event_id + "' class='bet'></td>" +
				"</tr>";

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

/**
 * This file handels all calls to the websocket
 *
 * @class websocket
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var websocket = (function ($) {

	/**
	 * Singleton instance of websocket connection
	 */
	var con = (function () {
		var con;

		function createInstance() {
			var websocket = new WebSocket('ws://87.106.24.155:9999/ws');

			websocket.onerror = function (event) {
				throwConnectionError();
			};

			return websocket;
		}

		return {
			getInstance: function () {
				if (!con) {
					con = createInstance();
				}
				return con;
			}
		};
	})();

	/**
	 * Initializing function
	 */
	function init() {
		var connection = con.getInstance();

		waitForSocketConnection(connection, 0);
	}

	/**
	 * Function that waits until Connection is established or it times out after 15sec
	 * @param socket
	 * @param times
	 */
	function waitForSocketConnection(socket, times) {
		setTimeout(
			function () {
				if (socket.readyState === 1) {

					if (firstStart()) {
						loadLogin();
					} else {
						start();
					}
				} else if (times === 30) {
					throwConnectionError();
				} else {
					waitForSocketConnection(socket, ++times);
				}

			}, 500); // wait 500 milliseconds for the connection...
	}

	/**
	 * Throws an error when connection can´t be established
	 */
	function throwConnectionError() {
		$("#loading").hide();
		ajax.loadError();
	}

	/**
	 * Removes loading screen and shows content
	 */
	function loadHomeScreen() {
		$("#loading").hide();
		ajax.loadHome();
	}

	/**
	 * Removes loading screen and shows Login
	 */
	function loadLogin() {
		$("#loading").hide();
		$.getJSON('assets/dist/json/countries.json', function (data) {
			localStorage.countries_json = JSON.stringify(data.countries);
		});
		ajax.loadLogin();
	}

	/**
	 * Returns true if app is started the first time
	 */
	function firstStart() {
		return !localStorage.userHash;
	}

	/**
	 * Creates a user with a certain hash and country
	 */
	function createUser(hash, country) {
		if (con.getInstance().readyState === 1) {

			var jsonRequest = {
				"get": "login",
				"user_hash": hash,
				"country": country
			};

			con.getInstance().send(JSON.stringify(jsonRequest));

			con.getInstance().onmessage = function (msg) {

				var response = JSON.parse(msg.data);

				if (response.response === "success") {
					// Redirect to homescreen
					start();
				} else {
					ajax.loadError();
				}
			};
		}
	}

	// Start function to get all necessary data from the servers
	function start() {
		$("#login").hide();
		$("#loading").show();

		if (con.getInstance().readyState === 1) {

			// Get tokens
			var jsonRequest = {
				"get": "tokens",
				"user_hash": localStorage.userHash
			};

			con.getInstance().send(JSON.stringify(jsonRequest));
			con.getInstance().onmessage = function (msg) {

				var response = JSON.parse(msg.data);

				localStorage.tokens = response.data[0].tokens;

				if (response.response === "success") {

					// Get Bets
					var jsonRequest = {
						"get": "bets",
						"user_hash": localStorage.userHash
					};

					con.getInstance().send(JSON.stringify(jsonRequest));
					con.getInstance().onmessage = function (msg) {

						var response = JSON.parse(msg.data);
						localStorage.bets_json = JSON.stringify(response.data);
						if (response.response === "success") {

							// Get Vouchers
							var jsonRequest = {
								"get": "vouchers",
								"user_hash": localStorage.userHash
							};

							con.getInstance().send(JSON.stringify(jsonRequest));
							con.getInstance().onmessage = function (msg) {

								var response = JSON.parse(msg.data);
								localStorage.vouchers_json = JSON.stringify(response.data);
								if (response.response === "success") {

									// Get Leaderboard
									var jsonRequest = {
										"get": "leaderboard"
									};

									con.getInstance().send(JSON.stringify(jsonRequest));
									con.getInstance().onmessage = function (msg) {

										var response = JSON.parse(msg.data);
										localStorage.leaderboard_json = JSON.stringify(response.data);
										if (response.response === "success") {

											// If everything is loaded go to the homescreen
											loadHomeScreen();

										} else {
											ajax.loadError();
										}
									};
								} else {
									ajax.loadError();
								}
							};
						} else {
							ajax.loadError();
						}
					};
				} else {
					ajax.loadError();
				}
			};
		}
	}


	return {
		init: function () {
			init();
		},
		createUser: function (hash, country) {
			return createUser(hash, country);
		},
		start: function () {
			start();
		}
	};

})
(jQuery);
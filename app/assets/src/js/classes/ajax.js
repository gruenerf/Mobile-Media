/**
 * This file handels ajax calls
 *
 * @class ajax
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var ajax = (function ($) {

	/**
	 * Initializing function
	 */
	function init() {

	}

	/**
	 * Function that binds ajax calls to click
	 */
	function reload() {
		var body = $("body");

		body.on('click', "#link_home", function () {
			loadHome();
		});

		body.on('click', "#link_leaderboard", function () {
			loadLeaderboard();
		});

		body.on('click', "#link_bets", function () {
			loadBets();
		});

		body.on('click', "#link_vouchers", function () {
			loadVouchers();
		});

		body.on('click', "#link_retailers", function () {
			loadRetailers();
		});
	}

	/**
	 * Loads an Error screen
	 */
	function loadError() {
		var content = $("#content");
		var body = $("body");
		var loading = $("#loading");

		content.load("view/error.html", function () {
			loading.hide();
			content.show();
		});
	}

	/**
	 * Loads the Home
	 */
	function loadHome() {
		var content = $("#content");
		var container = $("#container");
		var login = $("#login");
		var loading = $("#loading");

		content.load("view/home.html", function () {
			content.attr('class', 'content home');
			sidebar.close();
			login.hide();
			loading.hide();

			// Insert necessary data in view
			$("#tokens").empty().append(localStorage.tokens);
			$("#country_name").empty().append(localStorage.countryName);

			// Get medals
			var medals = leaderboard.getMedals();

			$("#medal_gold").empty().append(medals.gold);
			$("#medal_silver").empty().append(medals.silver);
			$("#medal_bronze").empty().append(medals.bronze);

			// Show content
			content.show();
			container.show();
		});
	}

	/**
	 * Loads Leaderboard
	 */
	function loadLeaderboard() {
		var content = $("#content");

		content.load("view/leaderboard.html", function () {
			content.attr('class', 'content leaderboard');
			leaderboard.getLeaderboard();
			sidebar.close();
		});
	}

	/**
	 * Loads Bets
	 */
	function loadBets() {
		var content = $("#content");

		content.load("view/bets.html", function () {
			content.attr('class', 'content bets');
			sidebar.close();
		});
	}

	/**
	 * Loads Vouchers
	 */
	function loadVouchers() {
		var content = $("#content");

		content.load("view/vouchers.html", function () {
			content.attr('class', 'content vouchers');
			sidebar.close();
		});
	}

	/**
	 * Loads Retailers
	 */
	function loadRetailers() {
		var content = $("#content");

		content.load("view/retailers.html", function () {
			content.attr('class', 'content retailers');
			sidebar.close();
		});
	}

	/**
	 *  Loads the login page
	 */
	function loadLogin() {
		var login = $("#login");

		login.load("view/login.html", function () {
			userSetup.loadCountries();
		});
	}

	return {
		init: function () {
			init();
			reload();
		},
		loadError: function () {
			loadError();
		},
		loadHome: function () {
			loadHome();
		},
		loadLogin: function () {
			loadLogin();
		}
	};

})(jQuery);
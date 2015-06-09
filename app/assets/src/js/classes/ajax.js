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
		var body = $("body");

		body.on("click", "#cancel", function () {
			document.getElementById("dialog").close();
		});
	}

	/**
	 * Function that binds ajax calls to click
	 */
	function reload() {
		var body = $("body");

		body.on('click', "#link_home", function () {
			$(".sidebar_item").removeClass('active');
			$("#link_home").addClass("active");
			loadHome();
		});

		body.on('click', "#link_leaderboard", function () {
			$(".sidebar_item").removeClass('active');
			$("#link_leaderboard").addClass("active");
			loadLeaderboard();
		});

		body.on('click', "#link_bets", function () {
			$(".sidebar_item").removeClass('active');
			$("#link_bets").addClass("active");
			loadBets();
		});

		body.on('click', "#link_vouchers", function () {
			$(".sidebar_item").removeClass('active');
			$("#link_vouchers").addClass("active");
			loadVouchers();
		});

		body.on('click', "#link_manual", function () {
			$(".sidebar_item").removeClass('active');
			$("#link_manual").addClass("active");
			loadManual();
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

			// Show notification about earned tokens
			if (localStorage.tokenDiff) {
				if (parseInt(localStorage.tokenDiff) > 0) {
					var dialog = $("#dialog");

					var string = "<div class='question'>You earned " + localStorage.tokenDiff + " Tokens.</div>" +
						"<div class='buttonarea'><button id='cancel'>Close</button></div>";


					dialog.empty().append(string);
					document.getElementById("dialog").showModal();
					localStorage.removeItem("tokenDiff");
				}
			}
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
	function loadBets(betSet) {
		var content = $("#content");

		content.load("view/bets.html", function () {
			content.attr('class', 'content bets');
			bets.getEvents();

			// Insert necessary data in view
			$("#tokens").empty().append(localStorage.tokens);

			if (betSet !== undefined) {
				$("#notification").append('Bet was successfully set.').show();
			}
			content.show();
			sidebar.close();
		});
	}

	/**
	 * Loads setBet
	 */
	function loadSetBet(eventName, eventId) {
		var content = $("#content");

		content.load("view/setBet.html", function () {
			content.attr('class', 'content setBet');
			userSetup.loadCountries("#bet_countries");
			$("#eventName").empty().append(eventName);
			$("#bet_button").attr("data-id", eventId);
		});
	}

	/**
	 * Loads Vouchers
	 */
	function loadVouchers(boughtVoucher) {
		var content = $("#content");

		content.load("view/vouchers.html", function () {
			content.attr('class', 'content vouchers');

			// Insert necessary data in view
			$("#tokens").empty().append(localStorage.tokens);

			if (boughtVoucher !== undefined) {
				$("#notification").append('Voucher was successfully bought.').show();
			}
			vouchers.init();
			content.show();
			sidebar.close();
		});
	}

	/**
	 * Loads Retailers
	 */
	function loadManual() {
		var content = $("#content");

		content.load("view/manual.html", function () {
			content.attr('class', 'content manual');
			sidebar.close();
		});
	}

	/**
	 *  Loads the login page
	 */
	function loadLogin() {
		var login = $("#login");

		login.load("view/login.html", function () {
			userSetup.setupLogin();
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
		},
		loadBets: function (betSet) {
			loadBets(betSet);
		},
		loadVouchers: function (boughtVoucher) {
			loadVouchers(boughtVoucher);
		},
		loadSetBet: function (eventName, eventId) {
			loadSetBet(eventName, eventId);
		}
	};

})(jQuery);
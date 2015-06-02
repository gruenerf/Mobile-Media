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

		var content = $("#content");
		var body = $("body");

		body.on('click', "#link_home", function () {
			content.load("view/home.html", function () {
				content.attr('class', 'content home');
				sidebar.close();
			});
		});

		body.on('click', "#link_leaderboard", function () {
			content.load("view/leaderboard.html", function () {
				content.attr('class', 'content leaderboard');
				sidebar.close();
			});
		});

		body.on('click', "#link_bets", function () {
			content.load("view/bets.html", function () {
				content.attr('class', 'content bets');
				sidebar.close();
			});
		});

		body.on('click', "#link_vouchers", function () {
			content.load("view/vouchers.html", function () {
				content.attr('class', 'content vouchers');
				sidebar.close();
			});
		});

		body.on('click', "#link_retailers", function () {
			content.load("view/retailers.html", function () {
				content.attr('class', 'content retailers');
				sidebar.close();
			});
		});
	}

	/**
	 * Loads an Error screen
	 */
	function loadError() {
		var content = $("#content");
		var body = $("body");

		content.load("view/error.html", function () {
			body.css("background", "#ffffff");
			content.show();
		});
	}

	/**
	 * Loads the Homescreen
	 */
	function loadHomeScreen() {
		var content = $("#content");
		var header = $("#header");
		content.load("view/home.html");
		content.show();
	}

	/**
	 * Loads the Home
	 */
	function loadHome(){
		var content = $("#content");

		content.load("view/vouchers.html", function () {
			content.attr('class', 'content home');
		});
	}

	/**
	 * Loads an Recipe screen
	 */
	function loadRecipes() {
		var content = $("#content");

		content.load("view/recipes.html", function () {
			content.attr('class', 'content recipes');
			recipe.recipe();
		});
	}

	/**
	 * Loads an Settings
	 */
	function loadSettings() {
		var content = $("#content");

		content.load("view/settings.html", function () {
			content.attr('class', 'content settings');
			//settings.setSettings();
			//settings.update();
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
		loadHomeScreen: function () {
			loadHomeScreen();
		},
		loadHome: function () {
			loadHome();
		},
		loadRecipes: function () {
			loadRecipes();
		},
		loadSettings: function () {
			loadSettings();
		}
	};

})(jQuery);
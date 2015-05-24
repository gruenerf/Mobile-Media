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

		body.on('click', "#home", function () {
			content.load("view/home.html", function () {
				content.attr('class', 'content home');
			});
		});

		body.on('click', "#recipes", function () {
			content.load("view/recipes.html", function () {
				content.attr('class', 'content recipes');
				recipe.recipe();
			});
		});

		body.on('click', "#fridge", function () {
			content.load("view/fridge.html", function () {
				content.attr('class', 'content fridge');
				websocket.getFridgeItems();
			});
		});

		body.on('click', "#shoppinglist", function () {
			content.load("view/shoppinglist.html", function () {
				content.attr('class', 'content shoppingList');
				websocket.getShoppingList();
			});
		});

		body.on('click', "#settings", function () {
			content.load("view/settings.html", function () {
				content.attr('class', 'content settings');
				settings.setSettings();
			});
		});

		body.on('click', "#addNewRecipe", function () {
			content.load("view/addNewRecipe.html", function () {
				content.attr('class', 'content addNewRecipe');
				websocket.getRecipes();
				calendar.setUp();
				recipe.addNew();
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

		content.load("view/home.html", function () {
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
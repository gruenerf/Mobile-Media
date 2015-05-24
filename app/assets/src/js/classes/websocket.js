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
			var websocket = new WebSocket('ws://37.235.60.89:9999/ws');

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
	 * Removes loading screen and shows content
	 */
	function loadHomeScreen() {
		$("#loading").hide();
		ajax.loadHomeScreen();
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
					loadHomeScreen();

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
		ajax.loadHomeScreen();
	}

	/**
	 * Returns the server Response with all recipes
	 */
	function getRecipes() {
		if (con.getInstance().readyState === 1) {
			con.getInstance().send(JSON.stringify({'get': 'recipes'}));
			con.getInstance().onmessage = function (msg) {
				var recipe_list = $("#select_recipe");
				var string = "";

				var response = JSON.parse(msg.data);
				var recipes = response.recipes;

				if (recipes.length) {
					for (var i = 0; i < recipes.length; i++) {
						string += "<option value='" + recipes[i].name + "' >" + recipes[i].name + "</option>";
					}
				} else {
					string = "<option>No recipes so far.</option>";
				}

				recipe_list.append(string);
			};
		}
	}

	/**
	 * Returns the server Response with all current fridge items
	 */
	function getFridgeItems() {
		if (con.getInstance().readyState === 1) {
			con.getInstance().send(JSON.stringify({'get': 'fridgeItems'}));
			con.getInstance().onmessage = function (msg) {
				var fridge_list = $("#fridge_list");
				var string = "";

				var response = JSON.parse(msg.data);
				var fridgeItems = response.fridgeItems;

				if (fridgeItems.length) {
					for (var i = 0; i < fridgeItems.length; i++) {
						string += "<div class='fridge_item'>" +
						"<div class='item_data'>" +
						"<div class='item_name'>" + fridgeItems[i].name + "</div>" +
						"<div class='item_size'>" + fridgeItems[i].size + fridgeItems[i].unit + "</div>" +
						"</div>" +
						"<div class='item_percentage' style='height:" + fridgeItems[i].percentage + "%'></div>" +
						"</div>";
					}
				} else {
					string = "<div class='fridge_item'>" +
					"<div class='item_name'>Currently no fridge items.</div>" +
					"</div>";
				}

				fridge_list.append(string);
			};
		}
	}

	/**
	 * Returns the server Response with the current shoppinglist
	 */
	function getShoppingList() {

		// Read localstorage for recipes
		var recipeArray = recipe.getRecipesForShoppingList();
		var recipes = [];

		// Make json string
		if(recipeArray.length){
			for (var i = 0; i < recipeArray.length; i++) {
				var array = {};
				array.name = recipeArray[i].name;
				recipes.push(array);
			}
		}

		// Make complete JSON string
		var recipeString = JSON.stringify({"get": "shoppingList", "recipes": recipes});

		// Ask via websocket for shoppinglist
		if (con.getInstance().readyState === 1) {
			con.getInstance().send(recipeString);
			con.getInstance().onmessage = function (msg) {
				var shopping_list = $("#shopping_list");
				var string = "";

				var response = JSON.parse(msg.data);
				var shoppingList = response.shoppingList;

				if (shoppingList.length) {
					 string += "<tr>"+
									"<td>Item</td>"+
									"<td>Amount</td>"+
								"</tr>";
					for (var i = 0; i < shoppingList.length; i++) {
						if(shoppingList[i].size !== 0) {
							string += "<tr>" +
							"<td class='item_name'>" + shoppingList[i].name + "</td>" +
							"<td class='item_size'>" + shoppingList[i].size + shoppingList[i].unit + "</td>" +
							"</tr>";
						}
					}
				} else {
					string = "<tr class='no_items'>" +
								"<td>No recommendations so far.</td>" +
							 "</tr>";
				}

				shopping_list.append(string);
			};
		}
	}

	return {
		init: function () {
			init();
		},

		getRecipes: function () {
			return getRecipes();
		},

		getFridgeItems: function () {
			return getFridgeItems();
		},

		getShoppingList: function () {
			return getShoppingList();
		}
	};

})
(jQuery);
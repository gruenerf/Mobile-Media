/**
 * This file handels vouchers
 *
 * @class vouchers
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var vouchers = (function ($) {

	/**
	 * Initializing function
	 */
	function init() {
		var body = $("body");

		// Colors the already bought ovuchers
		if (localStorage.vouchers_json) {
			var vouchersJson = JSON.parse(localStorage.vouchers_json);
			$.each(vouchersJson, function (i, v) {
				if (parseInt(v.voucher_id) === 1) {
					$("#ten").addClass("unlocked");
				}
				if (parseInt(v.voucher_id) === 2) {
					$("#twenty").addClass("unlocked");
				}
				if (parseInt(v.voucher_id) === 3) {
					$("#thirty").addClass("unlocked");
				}
				if (parseInt(v.voucher_id) === 4) {
					$("#forty").addClass("unlocked");
				}
				if (parseInt(v.voucher_id) === 5) {
					$("#fifty").addClass("unlocked");
				}
			});
		}


		// Opens dialog to buy a voucher
		body.on("click", ".voucher", function () {

			var dialog = $("#dialog");
			var string = "";

			if (!$(this).hasClass("unlocked")) {
				if ($(this).data("price") < localStorage.tokens) {
					string += "<div class='question'>Do you want to purchase the voucher for the price of " +
					$(this).data("price") + " Tokens?</div>" +
					"<div class='buttonarea'><button id='cancel'>Cancel</button>" +
					"<button data-id=" + $(this).data("id") + " data-price=" + $(this).data("price") +
					" id='buy_voucher'>Yes</button></div>";
				} else {
					string += "<div class='question'>You don´t have enough tokens to make that purchase!</div>" +
					"<div class='buttonarea'><button id='cancel'>Back</button></div>";
				}
			} else {
				string += "<div class='question'>Use this code to get your discount!</div>" +
				"<div class='voucher_hash' id='voucher_hash'>" + generateVoucherHash($(this).data("id")) + "</div>" +
				"<div class='buttonarea'><button id='cancel'>Back</button></div>";
			}


			dialog.empty().append(string);
			document.getElementById("dialog").showModal(// When buying selected starts servercommunication
				$("#buy_voucher").click(function () {
					websocket.buyVoucher($(this).data("id"));
					document.getElementById("dialog").close();
				}));
		});



	}

	/**
	 * Generates a voucher Hash which can be used as a validation method for Vouchers
	 * @param id
	 * @returns {string}
	 */
	function generateVoucherHash(id) {

		var amount = "";

		switch (id) {
			case 1 :
				amount = 10;
				break;
			case 2 :
				amount = 20;
				break;
			case 3 :
				amount = 30;
				break;
			case 4 :
				amount = 40;
				break;
			case 5 :
				amount = 50;
				break;
			default :
				amount = "";
				break;
		}


		return localStorage.userHash.substr(1, 4) + amount + localStorage.userHash.substr(5, 4);
	}

	return {
		init: function () {
			init();
		}
	};

})(jQuery);
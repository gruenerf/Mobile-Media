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

		if (localStorage.vouchers_json) {
			var vouchersJson = JSON.parse(localStorage.vouchers_json);
			$.each(vouchersJson, function (i, v) {
				if (v.voucher_id === 1) {
					$("#ten .wrapper").addClass("unlocked");
				}
				if (v.voucher_id === 2) {
					$("#twenty .wrapper").addClass("unlocked");
				}
				if (v.voucher_id === 3) {
					$("#thirty .wrapper").addClass("unlocked");
				}
				if (v.voucher_id === 4) {
					$("#forty .wrapper").addClass("unlocked");
				}
				if (v.voucher_id === 5) {
					$("#fifty .wrapper").addClass("unlocked");
				}
			});
		}

		body.on("click", ".voucher", function () {
			var dialog = $("#dialog");

			var string = "";

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

			dialog.empty().append(string);
			document.getElementById("dialog").showModal();
		});

		body.on("click", "#buy_voucher", function () {
			websocket.buyVoucher($(this).data("id"));
			document.getElementById("dialog").close();
		});
	}

	/**
	 * Generates a voucher Hash which can be used as a validation method for Vouchers
	 * @param amount
	 * @returns {string}
	 */
	function generateVoucherHash(amount) {
		return localStorage.userHash.substr(1, 4) + amount + localStorage.userHash.substr(5, 4);
	}

	return {
		init: function () {
			init();
		}
	};

})(jQuery);
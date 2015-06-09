/**
 * This file handels the sidebar menu
 *
 * @class sidebar
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var sidebar = (function ($) {

	/**
	 * Initializing function
	 */
	function init() {

		$("#sidebar").mmenu({
			navbar: {
				title: "",
				titleLink : "none"
			}
		}, {
			// configuration
			classNames: {
				selected: "active"
			}
		});


		$("#sidebar").on("opening.mm", function(){
			$("#menu_icon").addClass('open');
		});

	}

	/**
	 * Closes the sidebar
	 */
	function close() {
		$("#sidebar").data( "mmenu" ).close();
		$("#menu_icon").removeClass('open');
	}

	return {
		init: function () {
			init();
		},

		close: function() {
			close();
		}
	};

})(jQuery);
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

		/**
		 * Click on menu button
		 */
		$("[data-toggle]").click(function() {
			$(this).toggleClass('open');
			var toggle_el = $(this).data("toggle");
			$(toggle_el).toggleClass("open-sidebar");
		});

		/**
		 * Enable swipe functionality
		 */
		$(".main-content").swipe({
			swipeStatus:function(event, phase, direction, distance, duration, fingers)
			{
				if (phase==="move" && direction ==="right") {
					$(".container").addClass("open-sidebar");
					$("#sidebar-toggle").addClass('open');
					return false;
				}
				if (phase==="move" && direction ==="left") {
					$(".container").removeClass("open-sidebar");
					$("#sidebar-toggle").removeClass('open');
					return false;
				}
			}
		});

		/**
		 * Add active class to current page in menu
		 */
		$(".sidebar_item").on('click', function(){
			$(".sidebar_item").removeClass('active');
			$(this).addClass("active");
		});

	}

	/**
	 * Closes the sidebar
	 */
	function close() {
		$(".container").removeClass("open-sidebar");
		$("#sidebar-toggle").removeClass('open');
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
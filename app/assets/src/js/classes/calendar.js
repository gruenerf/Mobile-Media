/**
 * This file handels all date/calendar related functions
 *
 * @class calendar
 * @static
 * @author Ferdinand Grüner
 * @version  1.0
 * @return {Object} init-Function
 */

var calendar = (function ($) {


	/**
	 * Function that defines the difference between two dates
	 * @param datepart
	 * @param fromdate
	 * @param todate
	 * @returns {number}
	 */

	function dateDiff(datepart, fromDate, toDate) {
		datepart = datepart.toLowerCase();

		var res = toDate.split(".");
		var day = res[0];
		var month = res[1] - 1;
		var year = res[2];

		//Difference in milliseconds
		var diff = new Date(year, month, day) - fromDate;

		var divideBy = {
			w: 604800000,
			d: 86400000,
			h: 3600000,
			n: 60000,
			s: 1000
		};

		return Math.floor(diff / divideBy[datepart]) + 1;
	}

	/**
	 * Initializes Datepicker
	 */
	function setUpDatepicker() {
		/**
		 * Initialize datepicker
		 */
		$('#calendar').datepicker({
			inline: true,
			firstDay: 1,
			showOtherMonths: true,
			dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'],
			dateFormat: 'dd.mm.yy',
			minDate: new Date()
		});
	}

	return {
		dateDiff: function (datepart, fromDate, toDate) {
			return dateDiff(datepart, fromDate, toDate);
		},
		setUp: function () {
			setUpDatepicker();
		}
	};
})(jQuery);
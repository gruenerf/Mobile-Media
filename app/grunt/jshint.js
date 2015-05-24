/**
 * https://github.com/gruntjs/grunt-contrib-jshint
 *
 * Hinting for Javascript files. Edit .jshintrc to specify the kind of hinting.
 */

'use strict';
module.exports = {
	options: {
		jshintrc: '.jshintrc'
	},
	all: [
		'Gruntfile.js',

		//main project file

		'<%= package.basedir %>assets/src/js/*.js',
		'<%= package.basedir %>assets/src/js/classes/*.js',
		'!<%= package.basedir %>assets/src/js/scripts.min.js'


		//add more files here... or hint every javascript file with /js/**/*.js (this will often not work...)
	]
};
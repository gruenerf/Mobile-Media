/**
 * https://github.com/gruntjs/grunt-contrib-clean
 *
 * Deletes files from specified folders. Basically used to empty folders
 * before re-generating files like css- and javascript-files.
 */

'use strict';
module.exports = {
	//clean folders
	dist: [
		'<%= package.basedir %>assets/dist/css/',
		'<%= package.basedir %>assets/dist/js/',
		'<%= package.basedir %>assets/dist/img/'
	],
	css: [
		'<%= package.basedir %>assets/dist/css/'
	],
	js: [
		'<%= package.basedir %>assets/dist/js/'
	]
};
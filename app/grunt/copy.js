/**
 * https://github.com/gruntjs/grunt-contrib-copy
 *
 * Copy files from src to dist folder if they need not be altered (like font files).
 */

'use strict';
module.exports = {

	fonts: {
		expand: true,
		cwd: '<%= package.basedir %>assets/src/fonts/',
		src: '**',
		dest: '<%= package.basedir %>assets/dist/fonts/',
		flatten: false,
		filter: 'isFile',
	},

	img: {
		expand: true,
		cwd: '<%= package.basedir %>assets/src/img/',
		src: '**',
		dest: '<%= package.basedir %>assets/dist/img/',
		flatten: false,
		filter: 'isFile',
	}
};
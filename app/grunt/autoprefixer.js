/**
 * https://github.com/nDmitry/grunt-autoprefixer
 *
 * Sets vendor-prefixes in CSS file
 */

'use strict';
module.exports = {
	options: {
		browsers: ['last 10 versions', 'ie 8', 'ie 9', '> 1%']
	},
	dist: {
		files: {
			'<%= package.basedir %>assets/dist/css/main.min.css' : '<%= package.basedir %>assets/dist/css/main.min.css'
		}
	},

	//Autoprefixer will try to find a sourcemap from a previous compilation step using an annotation comment (e.g. from Sass) and create a new sourcemap based on the found one (or just create a new sourcemap).
	sourcemap: {
		options: {
			map: true
		},
		src: '<%= package.basedir %>assets/dist/css/main.min.css',
		dest: '<%= package.basedir %>assets/dist/css/main.min.css' // -> dest/css/file.css, dest/css/file.css.map
	}

};
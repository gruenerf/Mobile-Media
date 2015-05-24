/**
 * https://github.com/gruntjs/grunt-contrib-uglify
 */

'use strict';
module.exports = {

	dist: {
		files: {
			'<%= package.basedir %>assets/dist/js/scripts.min.js': [
				'<%= package.basedir %>assets/dist/js/scripts.js'
			]
		},
		options: {
			//preserve licencing information
			preserveComments: 'some',
			mangle: true,
			compress: true,
			beautify: false,
			report: 'min'
			// JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
			// sourceMap: 'htdocs/app/themes/hundebande/assets/js/scripts.min.js.map',
			// sourceMappingURL: '/app/themes/roots/htdocs/app/themes/hundebande/assets/js/scripts.min.js.map'

		}
	}
};
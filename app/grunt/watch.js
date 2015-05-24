/**
 * Live reloading: https://github.com/gruntjs/grunt-contrib-watch#live-reloading
 */

'use strict';
module.exports = {

	sass: {
		files: [
			'<%= package.basedir %>assets/src/css/*.scss',
		],
		tasks: ['clean:css', 'sass', 'autoprefixer:dist']
	},
	js: {
		files: [
			'<%= jshint.all %>'
		],
		tasks: ['clean:js', 'jshint', 'concat', 'uglify']
	},
	livereload: {
		// Browser live reloading
		options: {
			livereload: true
		},
		files: [
			'<%= package.basedir %>assets/dist/css/*.css',
			'<%= package.basedir %>assets/dist/js/*.js'
		]
	}
};
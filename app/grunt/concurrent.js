/**
 * https://github.com/sindresorhus/grunt-concurrent
 *
 * As a speed enhancement execute tasks at the same time. These sets of tasks
 * are called by aliases.yaml. Please consider carefully which tasks can run
 * concurrently as some tasks are based on the output of other tasks.
 */

'use strict';
module.exports = {
	//no newer: here, re-create all files

	//linting of source javascript, cleaning of distribution folder
	//install bower components via task instead of directly calling "bower install"
	//this way, all files are set up in the correct location (which is set up via package.json)
	first: ['jshint', 'clean:dist'],

	//generate css files, sprites and optimize images, concatenate javascript files
	//concatened scripts will be used for unit testing in next step
	second: ['sass:dist', 'concat', 'copy'],

	//set vendor-prefixes in generated css, do unit tests
	third: ['autoprefixer:dist'],

	//minify javascript
	fourth: ['uglify:dist', 'csslint:lax']
};
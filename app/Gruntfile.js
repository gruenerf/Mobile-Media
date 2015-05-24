/**
 * Nothing to see here. Grunt-tasks are automatically loaded from grunt/-folder.
 * Some tasks need to be renamed in jitGrund.
 * Tasks are indivually configured in grunt/ and called in aliases-yaml and concurrent.js.
 */

'use strict';

module.exports = function(grunt) {

	// require it at the top and pass in the grunt instance
	require('time-grunt')(grunt);


	//load tasks based on dependencies in package.json. Actual task configuration in /grunt/TASKNAME.js
	require('load-grunt-config')(grunt, {

		init: true, //auto grunt.initConfig
		jitGrunt: {
			bower: 'grunt-bower-task'
		}
	});
};

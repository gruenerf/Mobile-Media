/**
 * https://github.com/yatskevich/grunt-bower-task
 *
 * Loads frontend components via bower and adds them to the correct location 
 * within the project.
 *
 * Run 'grunt bower:install' if you edit the bower.json after initialising the project.
 */

'use strict';
module.exports = {

	install: {

		options: {
			targetDir: '<%= package.basedir %>assets/src/bower_components',

			//clean download folder
			cleanup: true,

			//There are two built-in named layouts: byType and byComponent.
			layout: 'byComponent',

			verbose: true,

			install: true
		}
	}
};

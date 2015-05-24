/**
 * https://github.com/gruntjs/grunt-contrib-sass
 *
 * Convert scss-files to css-files.
 */

'use strict';
module.exports = {
	dist: {
		options: {
			style: 'compressed', // Output style. Can be nested, compact, compressed, expanded.
			sourcemap: false, // Source maps are available, but require Sass 3.3.0 to be installed
			debugInfo: false, // Emit extra information in the generated CSS that can be used by the FireSass Firebug plugin.
			lineNumbers: false, // Emit comments in the generated CSS indicating the corresponding source line.
			trace: false, // Show a full traceback on error.
			check: false, // Just check syntax, don't evaluate.
			precision: 3, // How many digits of precision to use when outputting decimal numbers. Default: 3
			quiet: false, // Silence warnings and status messages during compilation.
			compass: false, // Make Compass imports available and load project configuration
			// loadPath: '', // Add a (or multiple) Sass import path.
			// require: '', // Require a (or multiple) Ruby library before running Sass.
			bundleExec: false, // Run sass with bundle exec: bundle exec sass.

		},
		files: {
			'<%= package.basedir %>assets/dist/css/main.min.css': [
				'<%= package.basedir %>assets/src/css/style.scss'
			]
		}
	}
};
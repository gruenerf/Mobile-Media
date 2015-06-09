/**
 * https://github.com/gruntjs/grunt-contrib-concat
 *
 * Concatenates javascript files. Except for the Modernizr-build all javascript files
 * will be concatenated into a single javascript file.
 *
 * Modernizr is loaded in the head-section and is seperately optimized by modernizr-task.
 *
 * jQuery et. al. should be loaded via CDN. A fallback version is seperately downloaded via
 * bower and optimized via uglify. It therefore does not need to be included here.
 */

module.exports = {
	options: {
			separator: ';'
		},
		all: {
			src : [

				//bootstrap plugins, please disable those you don't need:
				/*'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/affix.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/alert.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/button.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/carousel.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/collapse.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/dropdown.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/modal.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/popover.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/scrollspy.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/tab.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/tooltip.js',
				'<%= package.basedir %>assets/src/bower_components/bootstrap-sass/js/transition.js',*/

				//vendor javascript, please add your vendor libraries
				'<%= package.basedir %>assets/src/bower_components/jquery/jquery.js',
				'<%= package.basedir %>assets/src/bower_components/modernizr/*.js',
				'<%= package.basedir %>assets/src/bower_components/jQuery.mmenu/*.js',

				//javascript classes
				'<%= package.basedir %>assets/src/js/classes/*.js',

				//basically the _main.js file (better put project specific javascript classes in subfolder)
				'<%= package.basedir %>assets/src/js/*.js',

			],
			//scripts.js will be get minified by uglify-task.
			dest : '<%= package.basedir %>assets/dist/js/scripts.js'
		}
};
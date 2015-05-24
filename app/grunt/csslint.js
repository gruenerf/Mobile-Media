/**
 * https://github.com/gruntjs/grunt-contrib-csslint
 *
 * Linting of CSS files. Adjust .csslintrc to specify tests.
 */

'use strict';
module.exports = {

  options: {
    csslintrc: '.csslintrc'
  },
  strict: {
    options: {
      import: 2
    },
    //all css-files, including subfolders
    src: ['<%= package.basedir %>assets/dist/css/**/*.css']
  },
  lax: {
    options: {
      import: false
    },
    //all css-files, including subfolders
    src: ['<%= package.basedir %>assets/dist/css/**/*.css']
  }
};

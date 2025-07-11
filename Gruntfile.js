/**
 * Gruntfile
 *
 * This Node script is executed when you run `grunt`-- and also when
 * you run `sails lift` (provided the grunt hook is installed and
 * hasn't been disabled).
 *
 * WARNING:
 * Unless you know what you're doing, you shouldn't change this file.
 * Check out the `tasks/` directory instead.
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/Gruntfile.js
 */
module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          '.tmp/public/js/bundle.js': ['assets/js/recorder.js']
        },
        options: {
          browserifyOptions: { standalone: 'Recorder' }
        }
      }
    },
    // ... other tasks (jst, sass, etc.)
  });

  // Load Browserify task
  grunt.loadNpmTasks('grunt-browserify');

  // Load other default tasks
  //require('load-grunt-tasks')(grunt);

  var loadGruntTasks = require('sails-hook-grunt/accessible/load-grunt-tasks');

  // Load Grunt task configurations (from `tasks/config/`) and Grunt
  // task registrations (from `tasks/register/`).
  loadGruntTasks(__dirname, grunt);

};

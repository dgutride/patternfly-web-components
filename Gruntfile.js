module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n\n\n'
      },
      dist: {
        src: ['js/common.js', 'js/badge.js', 'js/modal.js', 'js/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['<%= concat.dist.src %>'],
      tasks: ['default']
    },
    connect: {
	  server: {
	    options: {
	      port: 9001,
	      base: '.'
	    }
      }
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('serve', ['default', 'connect', 'watch']);
  grunt.registerTask('default', ['concat', 'uglify']);
};
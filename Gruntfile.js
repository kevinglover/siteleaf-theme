module.exports = function(grunt) {
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      
    copy: {
      main: {
        files: [
        { expand: true, cwd: '/source/css/', src: '*.css', dest: './css/' },
        { expand: true, cwd: './source/css/', src: '*.map', dest: './css/' },
        { expand: true, cwd: './source/images/', src: ['*.png', '*.jpg', '*.gif', '*.jpeg', '*.ico'], dest: './images/' },
        { expand: true, cwd: './bower_components/bourbon/app/assets/stylesheets/', src: '**', dest: './source/css/bourbon/'},
        { expand: true, cwd: './bower_components/selectize/dist/js/standalone/', src: '*.min.js', dest: './js/selectize/'},
        { expand: true, cwd: './bower_components/modernizr/', src: 'modernizr.js', dest: './js/'}

        ]
      }
    },
    watch: {
      all: {
        options: {
          livereload: 9002
        },
        files: ['index.html','source/css/**/*.scss'],
        tasks: ['default']
      }
    },
    sass: {
      build: {
        options: {
          style: 'expanded',
          precision: 8
        },
        files: {
          './css/style.css': './source/css/style.scss'
        }
      }
    },
    
    nodeunit: {
      all: ['test/*_tests.js']
    }
  });
  
  // load all grunt tasks  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
    
  //if you choose to use scss, or any preprocessor, you can add it here
  grunt.registerTask('default', ['sass', 'copy']);
  
  grunt.registerTask('active-watch', ['sass', 'copy', 'watch']);
    
  //travis CI task
  grunt.registerTask('travis', ['sass', 'copy', 'watch', 'nodeunit']);
  
};

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
    
    uglify: {
      js: {
        files: { 'scripts/site.min.js': ['js/jquery.min.js','js/easing.js','js/classie.js','js/menu.js','js/material/*.js','js/selectize/*.js','js/uiMorphingButton.js','js/site.js','js/gridlet.js'] },
        options: {
            preserveComments: false,
            sourceMap: true
        }
      }
    },
    
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap:true
      },
      target: {
        files: {
          'styles/site.min.css': ['css/ripples.min.css', 'css/font-awesome.min.css','css/material-icons.css','css/component.css','css/style.css']
        }
      }
    },
    
    nodeunit: {
      all: ['test/*_tests.js']
    }
  });
  
  // load all grunt tasks  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
    
  //if you choose to use scss, or any preprocessor, you can add it here
  grunt.registerTask('default', ['sass', 'copy', 'uglify', 'cssmin']);
  
  grunt.registerTask('active-watch', ['sass', 'copy', 'uglify', 'cssmin', 'watch']);
    
  //travis CI task
  grunt.registerTask('travis', ['sass', 'copy', 'uglify', 'cssmin', 'watch', 'nodeunit']);
  
};

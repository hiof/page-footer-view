module.exports = function(grunt) {
  // Loads each task referenced in the packages.json file
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  // Initiate grunt tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    moment: require('moment'),
    // Tasks
    sass: {
      options: {

      },
      dist: {
        files: {
          'build/page-footer-view.css': 'app/assets/sass/page-footer-view.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
        //diff: 'build/config/*.diff'
      },
      prefix: {
        expand: true,
        //flatten: true,
        src: 'build/*.css'
        //dest: 'tmp/css/prefixed/'
      }
    },
    cssmin: {
      main: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %>, license: <%= pkg.license %> */'
        },
        expand: true,
        cwd: 'build',
        src: ['*.css', '!*.min.css'],
        dest: 'build/',
        ext: '.v<%= pkg.version %>.min.css'
      }
    },
    copy: {
      images: {
        expand: true,
        cwd: 'app/assets/images/',
        src: '**',
        dest: 'build/images',
        filter: 'isFile'
      },
      dist: {
        expand: true,
        cwd: 'build/',
        src: '**',
        dest: 'dist',
        filter: 'isFile'
      }
    },
    clean: {
      dist: ['dist/**/*'],
      deploy: ['deploy/**/*'],
      build: ['build/**/*']
    },
    eslint: {
      options: {
        //format: require('babel-eslint'),
        quiet: true
        //rulePath: ['node_modules/eslint-rules-es2015/lib/index.js']
      },
      target: ['app/assets/js/**/*.js']
    },
    //jshint: {
    //    options: {
    //        esversion: 6,
    //        ignores: ['app/assets/js/templates/templates.js']
    //    },
    //    files: ['app/assets/js/**/*.js', 'Gruntfile.js', 'bower.json', 'package.json']
    //},
    handlebars: {
      options: {
        namespace: 'Hiof.Templates',
        processName: function(filePath) {
          if (filePath.substring(0, 4) === 'vend') {
            return filePath.replace(/^vendor\/frontend\/app\/templates\//, '').replace(/\.hbs$/, '');
          } else {
            return filePath.replace(/^app\/templates\//, '').replace(/\.hbs$/, '');
          }
        }
      },
      all: {
        files: {
          "build/templates.js": ["app/templates/**/*.hbs"]
        }
      }
    },
    babel: {
      options: {
        sourceMap: true
        //presets: ['es2015']
      },
      dist: {
        files: {
          'build/_<%= pkg.name %>.js': 'app/assets/js/components/_page-footer-view.js'
        }
      }
    },
    concat: {
      scripts: {
        src: [
          'vendor/handlebars/handlebars.js',
          'vendor/pathjs/path.js',
          'build/templates.js',
          'vendor/detectjs/detect.min.js',
          'vendor/frontend/app/assets/js/components/__helper.js',
          'vendor/frontend/app/assets/js/components/__options.js',
          'build/_<%= pkg.name %>.js'
        ],
        dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        //compress: true,
        preserveComments: false,
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %>, license: <%= pkg.license %> */'
      },
      main: {
        files: {
          'build/<%= pkg.name %>.v<%= pkg.version %>.min.js': ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js']
        }
      }
    },
    versioning: {
      options: {
        cwd: 'build/',
        outputConfigDir: 'build/',
        namespace: 'hiof'
      },
      build: {
        files: [{
          assets: [{
            src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
          }],
          key: 'assets',
          dest: '',
          type: 'js',
          ext: '.min.js'
        }, {
          assets: [{
            src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
          }],
          key: 'assets',
          dest: '',
          type: 'css',
          ext: '.min.css'
        }]
      },
      deploy: {
        options: {
          output: 'php',
          outputConfigDir: 'build/',
        },
        files: [{
          assets: [{
            src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
          }],
          key: 'assets',
          dest: '',
          type: 'js',
          ext: '.min.js'
        },

        {
          assets: [{
            src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
          }],
          key: 'assets',
          dest: '',
          type: 'css',
          ext: '.min.css'
        }
      ]
    }
  },
  secret: grunt.file.readJSON('secret.json'),
  sftp: {
    stage: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.stage.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.stage.host %>',
        username: '<%= secret.stage.username %>',
        password: '<%= secret.stage.password %>',
        //privateKey: grunt.file.read('id_rsa'),
        //passphrase: '<%= secret.passphrase %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    },
    prod: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.prod.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.prod.host %>',
        username: '<%= secret.prod.username %>',
        password: '<%= secret.prod.password %>',
        //privateKey: grunt.file.read('id_rsa'),
        //passphrase: '<%= secret.passphrase %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    },
    stage2: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.stage2.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.stage2.host %>',
        username: '<%= secret.stage2.username %>',
        password: '<%= secret.stage2.password %>',
        //privateKey: grunt.file.read('id_rsa'),
        //passphrase: '<%= secret.passphrase %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    },
    prod2: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.prod2.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.prod2.host %>',
        username: '<%= secret.prod2.username %>',
        password: '<%= secret.prod2.password %>',
        //privateKey: grunt.file.read('id_rsa'),
        //passphrase: '<%= secret.passphrase %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    }
  }
  //watch: {
  //  hbs: {
  //    files: ['app/templates/**/*.hbs'],
  //    tasks: ['handlebars', 'copy:jstemplates'],
  //    options: {
  //      livereload: true,
  //    },
  //  },
  //  js: {
  //    files: ['app/assets/js/**/*.js', 'app/assets/js/**/*.json'],
  //    tasks: ['jshint', 'concat:scripts', 'versioning:build'],
  //    options: {
  //      livereload: true,
  //    },
  //  },
  //}

});

grunt.registerTask('subtaskJs', ['eslint', 'handlebars', 'babel', 'concat:scripts',  'uglify']);
//grunt.registerTask('subtaskJswww2', ['eslint', 'handlebars', 'babel', 'concat:scripts2',  'uglify']);
grunt.registerTask('subtaskCss', ['sass', 'autoprefixer', 'cssmin']);

grunt.registerTask('build', ['clean:build', 'clean:dist', 'copy:images', 'subtaskJs', 'subtaskCss', 'versioning:build']);
//grunt.registerTask('build2', ['clean:build', 'clean:dist', 'copy:images', 'subtaskJswww2', 'subtaskCss', 'versioning:build']);
grunt.registerTask('deploy', ['clean:build', 'clean:dist', 'copy:images', 'subtaskJs', 'subtaskCss', 'versioning:deploy', 'copy:dist']);
//grunt.registerTask('deploy2', ['clean:build', 'clean:dist', 'copy:images', 'subtaskJswww2', 'subtaskCss', 'versioning:deploy', 'copy:dist']);



grunt.registerTask('deploy-staging', ['deploy', 'sftp:stage']);
grunt.registerTask('deploy-prod', ['deploy', 'sftp:prod']);
grunt.registerTask('deploy-staging2', ['deploy', 'sftp:stage2']);
grunt.registerTask('deploy-prod2', ['deploy', 'sftp:prod2']);

};

module.exports = function(grunt) {
    // Environment Variables
    var SASS_COMPILER = process.env.SASS_COMPILER;

    // Load Grunt modules
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies',
        // Exclude Sass compilers. We choose the one to load later on.
        pattern: ['grunt-*', '!grunt-sass', '!grunt-contrib-sass']
    });

    // Register tasks
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['clean','html2js','concat','dist-css','copy:assets','copy:bootstrap','copy:config']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    // Karma Configuration/Settings
    var karmaConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, keepalive: true };
        var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
        return grunt.util._.extend(options, customOptions, travisOptions);
    };

    // Project configuration.
    grunt.initConfig({
        distdir: 'dist',
        assdir: 'static',
        pkg: grunt.file.readJSON('package.json'),
        banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
        ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src: {
            sass: {
                core: ['src/scss/stylesheet.scss'],
                comb: 'src/scss/.csscomb.json'
            },
            sassWatch: ['src/scss/**/*.scss'],
            js: [
                'src/app/**/*.js',
                'src/common/**/*.js'
            ],
            jsTpl: ['<%= distdir %>/templates/**/*.js'],
            tpl: {
                app: ['src/app/**/*.tpl.html'],
                common: ['src/common/**/*.tpl.html']
            }
        },
        clean: ['<%= distdir %>/*'],
        concat: {
            dist:{
                options: {
                    banner: "<%= banner %>"
                },
                src:['<%= src.js %>', '<%= src.jsTpl %>'],
                dest:'<%= distdir %>/js/<%= pkg.name %>.js'
            },
            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            },
            angular: {
                src: [
                    'src/bower_components/angular/angular.js',
                    'src/bower_components/angular-http-auth/src/http-auth-interceptor.js',
                    'src/bower_components/angular-mocks/angular-mocks.js',
                    'src/bower_components/angular-route/angular-route.js',
                    'src/bower_components/ngstorage/ngStorage.js'
                ],
                dest: '<%= distdir %>/js/angular.js'
            }
        },
        copy: {
            assets: {
                files: [
                    {
                        dest: '<%= distdir %>/assets',
                        src : '**',
                        expand: true,
                        cwd: 'src/assets/' }
                ]
            },
            bootstrap: {
                files: [
                    {
                        dest: '<%= distdir %>/vendor/bootstrap',
                        src : '**',
                        expand: true,
                        cwd: 'src/bower_components/bootstrap/dist' }
                ]
            },
            config: {
                files: [
                    {
                        dest: '<%= distdir %>',
                        src : [
                            '.htaccess'
                        ],
                        expand: true,
                        cwd: 'src' }
                ]
            }
        },
        csscomb: {
            options: {
                config: '<%= src.sass.comb %>'
            },
            dist: {
                expand: true,
                cwd: '<%= dist %>/css/',
                src: ['<%= pkg.name %>.css'],
                dest: 'dist/css/'
            }
        },
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                noAdvanced: true
            },
            core: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= distdir %>/css',
                        src: ['<%= pkg.name %>.css'],
                        dest: '<%= distdir %>/css',
                        ext: '.min.css'
                    }
                ]
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.app'
            },
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= distdir %>/templates/common.js',
                module: 'templates.common'
            }
        },
        karma: {
            unit: {
                options: karmaConfig('test/config/unit.js')
            },
            watch: {
                options: karmaConfig('test/config/unit.js', {singleRun: false, autoWatch: true})
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('autoprefixer')({
                        browsers: [
                            'Android 2.3',
                            'Android >= 4',
                            'Chrome >= 35',
                            'Firefox >= 31',
                            'Explorer >= 9',
                            'iOS >= 7',
                            'Opera >= 12',
                            'Safari >= 7.1'
                        ]
                    })
                ]
            },
            core: {
                src: ['<%= distdir %>/css/<%= pkg.name %>.css']
            }
        },
        usebanner: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            files: {
                src: '<%= distdir %>/css/<%= pkg.name %>.css'
            }
        },
        watch: {
            sass: {
                files: ['<%= src.sassWatch %>'],
                tasks: ['sass'],
                options: {
                    interrupt: true,
                    livereload: true
                    //reload: true
                }
            },
            build: {
                files: [
                    '<%= src.js %>',
                    '<%= src.sassWatch %>',
                    '<%= src.tpl.app %>',
                    '<%= src.tpl.common %>'
                ],
                tasks: ['build', 'timestamp'],
                options: {
                    interrupt: true,
                    livereload: true
                    //reload: true
                }
            }
        }
    });

    // CSS distribution task.
    // Supported Compilers: sass (Ruby) and libsass
    (function (sassCompilerName) {
        require('./grunt/sass-compile/' + sassCompilerName + '.js')(grunt);
    })(SASS_COMPILER || 'libsass');

    grunt.registerTask('sass-compile', ['sass:core']);//, 'sass:docs']);

    grunt.registerTask('dist-css', ['sass-compile', 'postcss:core', 'usebanner', 'csscomb:dist', 'cssmin:core']);

};
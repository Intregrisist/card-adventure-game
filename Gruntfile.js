module.exports = function(grunt) {

    // Load Grunt modules
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-html2js');

    // Register tasks
    grunt.registerTask('default', ['clean','sass','copy']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    // Project configuration.
    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
        ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src: {
            sass: ['src/scss/stylesheet.scss'],
            js: ['src/app/**/*.js'],
            jsTpl: ['<%= distdir %>/templates/**/*.js']
        },
        clean: ['<%= distdir %>/*'],
        copy: {
            assets: {
                files: [
                    {
                        dest: '<%= distdir %>',
                        src : '**',
                        expand: true,
                        cwd: 'src/'
                    }
                ]
            }
        },
        concat: {
            angular: {
                src: [
                    'src/bower_components/angular/angular.js',
                    'src/bower_components/angular-route/angular-route.js',
                    'src/bower_components/angular/angular-mocks/angular-mocks.js'
                ],
                dest: '<%= distdir %>/js/angular.js'
            }
        },
        sass: {
            dist: {
                files: {
                    '<%= distdir %>/css/<%= pkg.name %>.min.css': ['<%= src.sass %>']
                },
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                }
            },
            test: {
                files: {
                    '<%= distdir %>/css/<%= pkg.name %>.css': ['<%= src.sass %>']
                },
                options: {
                    style: 'nested',
                    sourcemap: 'auto'
                }
            }
        }
    });

};
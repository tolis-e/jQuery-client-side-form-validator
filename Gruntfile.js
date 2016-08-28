module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost'
                }
            }
        },
        qunit: {
            formValidator: {
                files: [],
                options: {
                    urls: [
                        "http://localhost:<%= connect.server.options.port %>/tests/unit/index.html"
                    ]
                }
            },
            options: {
                timeout: 10000
            }
        },
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %><%= "\\n" %>' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright 2016 Tolis Emmanouilidis <%= "\\n" %>' +
                ' * Released under the MIT license.<%= "\\n" %>' +
                ' * <%= pkg.licenses[0].url + "\\n" %>' +
                ' */' +
                '<%= "\\n" %>'
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= meta.banner %>'
            },
            js: {
                src: ['src/js/FormValidator.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            all: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': [ 'dist/js/<%= pkg.name %>.js' ]
                },
                options: {
                    preserveComments: 'some',
                    sourceMap: 'dist/js/<%= pkg.name %>.js.map',
                    sourceMappingURL: '<%= pkg.name %>.js.map',
                    sourceMapPrefix: 1,
                    beautify: {
                        ascii_only: true
                    }
                }
            },
        },
        jshint: {
            all: {
                src: [ "Gruntfile.js", "src/**/*.js", "tests/**/*.js" ],
                options: {
                    jshintrc: ".jshintrc"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['jshint', 'connect', 'qunit:formValidator', 'concat', 'uglify:all']);
};
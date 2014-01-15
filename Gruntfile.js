/*
 * Generated on 2014-01-05
 * generator-assemble v0.4.5
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    // Load grunt tasks automatically front package.json
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', 'assemble'],
        config: 'package.json',
        scope: ['devDependencies']
    });

    //require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'in',
            dist: 'out',
            lib: 'lib',
            root: '<%= config.src %>/root',
            stage: 'stage'
        },

        //
        watch: {
            assemble: {
                files: ['<%= config.root %>/**/*.{md,html,yml,yaml}'],
                tasks: ['assemble']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.stage %>/**/*.html',
                    '<%= config.stage %>/assets/**/*.css',
                    '<%= config.stage %>/assets/**/*.js',
                    '<%= config.root %>/assets/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.stage %>',
                        '<%= config.src %>'
                    ]
                }
            }
        },

        assemble: {
            // def: {
            //     options: {
            //         flatten: true,
            //         assets: '<%= config.src %>/assets',
            //         layoutdir: '<%= config.src %>/templates/layouts/',
            //         layout: 'page.html',
            //         data: '<%= config.src %>/**/*.{json,yml,yaml}',
            //         partials: '<%= config.src %>/templates/partials/**/*.html',
	    //         helpers: ['<%= config.src %>/lib/Handlebars/helpers/**/*.js'],

            //         site: {
            //             title: 'Assemble Releases'
            //         }
            //     },
            //     files: [{
	    //         expand: true,     // Enable dynamic expansion.
	    //         cwd: '<%= config.root %>',      // Src matches are relative to this path.
	    //         src: ['**/*.html'], // Actual pattern(s) to match.
	    //         dest: '<%= config.stage %>/',   // Destination path prefix.
	    //         //ext: '.html',   // Dest filepaths will have this extension.
	    //     }]
            // },

            // default options
            options: {
                flatten: false,
                assets: '<%= config.src %>/assets',
                layoutdir: '<%= config.src %>/templates/layouts/',
                layout: 'page.html',
                data: '<%= config.src %>/**/*.{json,yml,yaml}',
                partials: '<%= config.src %>/templates/partials/**/*.html',
	        helpers: ['<%= config.src %>/lib/Handlebars/helpers/**/*.js'],

                site: {
                    title: 'Assemble Releases'
                }
            },
            // root landing
            root: {
                options: {
                },
                files: [{
	            expand: true,     // Enable dynamic expansion.
	            cwd: '<%= config.root %>',      // Src matches are relative to this path.
	            src: ['*.html','*.md'], // Actual pattern(s) to match.
	            dest: '<%= config.stage %>',   // Destination path prefix.
	            //ext: '.html',   // Dest filepaths will have this extension.
	        }]
            },

            // the 'pages' collection
            pages: {
                options: {
                },
                files: [{
	            expand: true,     // Enable dynamic expansion.
	            cwd: '<%= config.root %>/pages',      // Src matches are relative to this path.
	            src: ['**/*.html','**/*.md'], // Actual pattern(s) to match.
	            dest: '<%= config.stage %>/page',   // Destination path prefix.
	            //ext: '.html',   // Dest filepaths will have this extension.
	        }]
            },

            // the 'releases' collection
            releases: {
                options: {
                    compose: {
                        cwd: './'
                    }
                },
                files: [{
	            expand: true,     // Enable dynamic expansion.
	            cwd: '<%= config.root %>/releases',      // Src matches are relative to this path.
	            src: ['*/*.html'], // Actual pattern(s) to match.
	            dest: '<%= config.stage %>/release',   // Destination path prefix.
	            //ext: '.html',   // Dest filepaths will have this extension.
	        }]
            }
        },
        
        // clean up generated sources in stage
        jsbeautifier: {
            options: {
                html: {
                    maxPreserveNewlines: 0,
                    preserveNewlines: true,
                    wrapLineLength: 0
                },
                css: {
                },
                js: {
                }
            },
            stage: {
                src: '<%= config.stage %>/**/*'
            }
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: ['<%= config.stage %>/**/*']        
    });

    grunt.registerTask('serve', [
        'clean',
        'assemble',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'assemble',
        'jsbeautifier'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};

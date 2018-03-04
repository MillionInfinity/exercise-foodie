module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: ['../js/main.js'],
                dest: '../dist/app.js'
            },
            options: {
                browserifyOptions: {
                    paths: [
                        "./node_modules"
                    ]
                }
            }
        },
        jshint: {
            options: {
                predef: ["document", "console", "$"],
                esnext: true,
                strict: "global",
                globals: { "Cake": true, "$": true },
                browserify: true,
                debug: true
            },
            files: ['../js/**/*.js']
        },
        sass: {
            dist: {
                files: {
                    '../css/main.css': '../sass/main.scss'
                }
            }
        },
        watch: {
            javascripts: {
                files: ['../js/**/*.js'],
                tasks: ['jshint', 'browserify']
            },
            sass: {
                files: ['../sass/**/*.scss'],
                tasks: ['sass']
            },
            browserify: {
                files: ['../js/*.js'],
                tasks: ["browserify"]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
};
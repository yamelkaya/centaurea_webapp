module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine_node: {
            projectRoot: "./tests/specs",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath : "./tests/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            }
        },
        clean: {
            build: {
                src: '../centaurea_build',
                options: {
                    force: true
                }
            }
        },
        copy: {
            build: {
                src: ['public/**/*','src/**/*','libs/**/*','node_modules/**/*','app.js','config.json'],
                dest: '../centaurea_build/',
                expand: true
            }
        },
        uglify: {
            build: {
                options:{
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    src: '../cenaturea_build/**/*.js'
                }]
            }
        },
        cssmin: {
            build: {
                expand: true,
                src: ['../centaurea_build/**/*.css', '!../centaurea_build/**/*.min.css'],
                dest: '../centaurea',
                ext: '.min.css'
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: [
                        '../centaurea_build/**/*.html',
                        '!../centaurea_build/public/partials/blog-post-preview/**/*.html',
                        '!../centaurea_build/public/master/master-blog.html'
                    ],
                    dest: '../centaurea_build/'
                }]
            }
        },
        compress: {
            build: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                src: '../centaurea_build/public/**/*',
                dest: '../centaurea_build/',
                rename: function (src, dest){
                    return dest+'.gz';
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-jasmine-node');
    //grunt.renameTask('jasmine_node', 'test');

    //
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('build',['clean','copy','uglify','cssmin','htmlmin','compress']);
    grunt.registerTask('default', ['build']);
};
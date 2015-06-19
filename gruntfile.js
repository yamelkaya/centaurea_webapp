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
                    src: '../centaurea_build/public/**/*.js'
                }]
            }
        },
        cssmin: {
            build: {
                expand: true,
                src: ['../centaurea_build/public/**/*.css', '!../centaurea_build/public/**/*.min.css'],
                dest: '../centaurea'
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    keepClosingSlash: true
                },
                files: [{
                    expand: true,
                    src: [
                        '../centaurea_build/public/**/*.html',
                        '!../centaurea_build/public/partials/blog-post-preview/**/*.html',
                        '!../centaurea_build/public/master/master-blog.html'
                    ],
                    dest: '../centaurea_build/'
                }]
            }
        },
        concat: {
            js :{
                options: {
                    separator: ';'
                },
                files: {
                    '../centaurea_build/public/js/built.js' : [
                        '../centaurea_build/public/js/jquery-1.10.2.min.js',
                        '../centaurea_build/public/js/bootstrap.min.js',
                        '../centaurea_build/public/js/lib/smoothscroll.js',
                        '../centaurea_build/public/js/lib/jquery.sudoslider.min.js',
                        '../centaurea_build/public/js/lib/jquery.mixitup.min.js',
                        '../centaurea_build/public/js/lib/jquery.backtotop.js',
                        '../centaurea_build/public/js/lib/jquery.mobileresponsive.js',
                        '../centaurea_build/public/js/lib/jquery.mobileresponsive.js',
                        '../centaurea_build/public/js/lib/responsiveslides.min.js',
                        '../centaurea_build/public/js/main.js',
                    ]
                }
            },
            css: {
                files: {
                    '../centaurea_build/public/css/built.css': [
                        '../centaurea_build/public/css/bootstrap.min.css',
                        '../centaurea_build/public/css/lib/font-awesome.css',
                        '../centaurea_build/public/css/lib/responsiveslides/responsiveslides.css',
                        '../centaurea_build/public/css/lib/responsiveslides/themes.css',
                    ],
                    '../centaurea_build/public/css/style-built.css': [
                        '../centaurea_build/public/css/style.css',
                        '../centaurea_build/public/css/scheme/blue.css',
                    ]
                }
            },
            respond: {
                options: {
                    separator: ';'
                },
                files: {
                    '../centaurea_build/public/js/respond-built.js' : [
                        '../centaurea_build/public/js/html5shiv.js',
                        '../centaurea_build/public/js/respond.min.js'
                    ]
                }
            }
        },
        processhtml: {
            options: {
            },
            dist: {
                files: {
                    '../centaurea_build/public/master/master.html': ['../centaurea_build/public/master/master.html'],
                    '../centaurea_build/public/master/master-blog.html': ['../centaurea_build/public/master/master-blog.html'],
                    '../centaurea_build/public/master/master-blog-post.html': ['../centaurea_build/public/master/master-blog-post.html'],
                    '../centaurea_build/public/master/master-with-contact-footer.html': ['../centaurea_build/public/master/master-with-contact-footer.html']
                }
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('build',['clean','copy','concat','uglify', 'cssmin','processhtml','htmlmin','compress']);
    grunt.registerTask('default', ['build']);
};
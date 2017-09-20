module.exports = function(grunt) {

    // Configure plugins
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Script files (note the order)
        scriptFiles: [
            'www/js/app.js',
            'www/js/app.*.js',
            'www/js/controllers/*.controller.js',
            'www/js/services/api.service.js',
            'www/js/services/api/*.api.js'
        ],

        // CSS files
        styleFiles: [
            'www/css/style.css'
        ],

        // Plugin configurations
        cssmin: {
            app: {
                files: {
                    'www/dist/styles.min.css': ['<%= styleFiles %>']
                }
            }
        },
        jshint: {
            app: [
                'Gruntfile.js',
                'www/**/*.js'
            ]
        },
        uglify: {
            options: {
                sourceMap: true
            },
            app: {
                files: {
                    'www/dist/app.min.js': ['<%= scriptFiles %>']
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= scriptFiles %>'],
                tasks: ['uglify:app']
            },
            styles: {
                files: ['<%= styleFiles %>'],
                tasks: ['cssmin:app']
            }
        }
    });

    // Run as "grunt uglify"
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Run as "grunt cssmin"
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Run as "grunt jshint"
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Run as "grunt watch"
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Run as "grunt [default]"
    grunt.registerTask('default', ['uglify:app', 'cssmin:app']);
};

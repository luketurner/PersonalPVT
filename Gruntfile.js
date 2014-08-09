module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Project configuration.
    grunt.initConfig({
        concat: {
            'app.concat.js': ['app.js', 'components/**/*.js', 'login/*.js', 'home/*.js', 'pretrial/*.js', 'results/*.js', 'signup/*.js', 'trial/*.js' ]
        }
    });

    // Load the plugin that provides the "uglify" task.
    // Default task(s).
    grunt.registerTask('default', ['concat']);
};
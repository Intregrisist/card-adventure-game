// Compile Bootstrap with [Ruby Sass][1] using [grunt-contrib-sass][2]
// [1]: https://github.com/sass/sass
// [2]: https://github.com/gruntjs/grunt-contrib-sass
module.exports = function configureRubySass(grunt) {
    // Get src object
    var src = grunt.config.data.src;

    var options = {
        loadPath: ['scss'],
        precision: 6,
        sourcemap: 'auto',
        style: 'expanded',
        trace: true,
        bundleExec: true
    };
    grunt.config.merge({
        sass: {
            core: {
                options: options,
                files: {
                    '<%= distdir %>/css/<%= pkg.name %>.css': src.sass.core
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
};

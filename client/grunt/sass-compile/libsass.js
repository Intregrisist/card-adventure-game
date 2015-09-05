// Compile Bootstrap with [libsass][1] using [grunt-sass][2]
// [1]: https://github.com/sass/libsass
// [2]: https://github.com/sindresorhus/grunt-sass
module.exports = function configureLibsass(grunt) {
    // Get src object
    var src = grunt.config.data.src;

    grunt.config.merge({
        sass: {
            options: {
                includePaths: ['scss'],
                precision: 6,
                sourceComments: false,
                sourceMap: true,
                outputStyle: 'expanded'
            },
            core: {
                files: {
                    '<%= distdir %>/css/<%= pkg.name %>.css': src.sass.core
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-sass');
};

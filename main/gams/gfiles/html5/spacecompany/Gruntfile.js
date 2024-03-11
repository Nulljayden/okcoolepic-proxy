/*global module:false*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'), // Read the package.json file and parse it as a JSON object.
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Authored <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;*/\n', // Define a banner comment for the top of the compiled file.

    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>', // Use the banner defined above.
        stripBanners: true // Remove all banner comments from the concatenated files.
      },
      dist: {
        src: ['variable.js', 'utils.js', 'game.js', 'achievements.js', 'constants.js', 'core.js', 'loading.js', 'notification.js', 'resources.js', 'saving.js', 'solarSystem.js', 'solCenter.js', 'wonder.js', 'interstellar.js'], // List of files to concatenate.
        dest: 'build/<%= pkg.name %>.js' // Destination file for the concatenated files.
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>' // Use the banner defined above.
      },
      dist: {
        src: 'build/<%= pkg.name %>.js', // File to minify.
        dest: 'build/<%= pkg.name %>.min.js' // Destination file for the min

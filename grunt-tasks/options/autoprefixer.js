'use strict';

module.exports = function (grunt) {
    grunt.config('autoprefixer', {
		options: {

		},

		dev: {
			src: '<%= grunt.config.tmp %>/styles/bundle.css',
			dest: '<%= grunt.config.tmp %>/styles/bundle.css'
		}
	});
};
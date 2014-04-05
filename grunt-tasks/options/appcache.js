'use strict';

module.exports = function (grunt) {
    grunt.config('appcache', {
        options: {
            basePath: 'dist'
        },
        all: {
            dest: 'dist/manifest.appcache',
            cache: [
                'dist/*.{js,html}',
                'dist/scripts/**/*.js',
                'dist/styles/*.css',
                'dist/styles/fonts/*',
                'dist/images/**/*.{gif,webp,svg,png,jpg,jpeg}'
            ],
            network: '*',
            fallback: '/ /offline.html'
        }
    });
};

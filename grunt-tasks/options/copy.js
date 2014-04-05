'use strict';
// Put files not handled in other tasks here
module.exports = function(grunt) {
    grunt.config('copy', {
        dist: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= grunt.config.app %>',
                    dest: '<%= grunt.config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'offline.html',
                        '.htaccess',
                        'images/{,*/}*.{gif,webp,svg,png,jpg,jpeg}',
                        'styles/fonts/*',
                        (function(){
                            var dependenciesToCopyToDist = [];
                            for(var dep in require('../../bower.json').dependencies){
                                dependenciesToCopyToDist.push('app/bower_components/'+dep+'/**');
                            }
                            return dependenciesToCopyToDist;
                        }())
                    ]
                }
            ]
        }
    });
};
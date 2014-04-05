'use strict';

angular.module('Directives').directive('button', function () {
    return {
        restrict: 'E',
        link: function(scope, el){
            el.bind('touchstart', function(){
                el.addClass('tapping');
            });
            el.bind('touchend', function(){
                el.removeClass('tapping');
            });
            el.bind('touchmove', function(){
                el.removeClass('tapping');
            });
        },
        controller: function(){

        }
    }
});
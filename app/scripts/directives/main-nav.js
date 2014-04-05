'use strict';

angular.module('Directives').directive('mainNav', function () {
    return {
        restrict: 'E',
        scope: {
            title: '=title',
            rightButton: '@rightButton',
            leftButton: '@leftButton'
        },
        replace: true,
        templateUrl: 'scripts/directives/views/main-nav.html',
        link: function(){

        },
        controller: function($scope, $location){
            $scope.toggleMenu = function(){
                $location.path('dashboard');
            };
            $scope.goToAdd = function(){
                $location.path('expense/add/');
            };
        }
    };
});
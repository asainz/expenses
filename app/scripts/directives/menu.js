'use strict';

angular.module('Directives').directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/views/menu.html',
        replace: true,
        scope: {

        },
        link: function(){

        },
        controller: function($scope, $location){
            $scope.goHome = function(){
                $location.path('/dashboard');
            };
        }
    }
});
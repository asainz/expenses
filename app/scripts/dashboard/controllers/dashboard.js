'use strict';

angular.module('Dashboard').controller('DashboardCtrl', function ($scope, $location) {
    $scope.mainNav = {
        title: 'Dashboard'
    };

    $scope.showStats = function(){
        $location.path('expense/23123123123');
    }
});
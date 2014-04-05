'use strict';

angular.module('Expense').controller('ExpenseAddCtrl', function ($scope) {
    $scope.mainNav = {
        title: 'Add expense'
    };

    $scope.fields = {
        date: '2014-04-05'
    };
});
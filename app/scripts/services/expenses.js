'use strict';

angular.module('Services').factory('Expenses', function ($resource) {
    return $resource('http://127.0.0.1:8080/service/http://expenses');
});
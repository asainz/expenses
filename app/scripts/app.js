'use strict';

var _mainModules = [
    'Services'
    ,'Filters'
    ,'Directives'
    ,'ngRoute'
    ,'ngResource'
    ,'ngAnimate'
    ,'ngTouch'
    ,'ngLocale'
    ,'Dashboard'
    ,'Expense'
    // yo:ngMainModules
];


angular.module('Expenses', _mainModules )
    .config( function($routeProvider, MockeyRequestsInterceptorSrvProvider){
        MockeyRequestsInterceptorSrvProvider.startIntercepting(true);

        //redirect any invalid hash to /home
        $routeProvider.otherwise({
            redirectTo: '/dashboard'
        });

        var routes = [];

        routes.push({
            name: '/dashboard',
            params: {
                templateUrl: 'scripts/dashboard/views/dashboard.html',
                controller: 'DashboardCtrl'
            }
        });
        
        routes.push({
            name: '/expense/add',
            params: {
                templateUrl: 'scripts/expense/views/expense-add.html',
                controller: 'ExpenseAddCtrl'
            }
        });
        
        routes.push({
            name: '/expense/:id',
            params: {
                templateUrl: 'scripts/expense/views/expense.html',
                controller: 'ExpenseCtrl'
            }
        });

        routes.push({
            name: '/expense/:id/edit',
            params: {
                templateUrl: 'scripts/expense/views/expense.html',
                controller: 'ExpenseEditCtrl'
            }
        });
        
// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });
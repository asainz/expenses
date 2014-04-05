'use strict';

angular.module('Services').provider('MockeyRequestsInterceptorSrv', function ($httpProvider) {

    // expose any configuration method method you need by adding them to `this` object
    var shouldOverride = false;
    var started = false;
    var defaultOptions = {
        headersToRemove: ['Authorization'],
        overrideMethodsTo: 'GET'
    };
    var userOptions = defaultOptions;
    var options = {};

    this.startIntercepting = function(overrideRequests){
        shouldOverride = overrideRequests && (overrideRequests === 'true' || overrideRequests === true);

        if( shouldOverride && !started ){
            started = true;
            intercept();
        }
    };

    this.setConfig = function(options){
        userOptions = options;
    };

    var intercept = function(){
        options = angular.extend({}, defaultOptions, userOptions);

        $httpProvider.interceptors.push(function($q) {
            return {
                request: function(config) {
                    if( config.method === 'POST' || config.method === 'PUT' || config.method === 'DELETE' ){
                        config.params = config.data;
                        delete config.data;
                    }

                    options.headersToRemove.forEach(function(header){
                        if( config.headers.hasOwnProperty( header ) ){
                            delete config.headers[ header ];
                        }
                    });

                    config.method = options.overrideMethodsTo;
                    return config || $q.when(config);
                },

                response: function(response) {
                    return response || $q.when(response);
                }
            };
        });
    };

    this.$get = [function(){
        
        return {};
    }];

});
var services = angular.module('couplingIO.services', ['LocalStorageModule']);

services.factory('sessionStorage', ['localStorageService', function (localStorageService) {

	var factory = {};

    factory.getSessionData = function(){
        var data = {
            username : localStorageService.get('username'),
        };
        console.log('Session DATA:');
        console.log(data);
        return data;
    }

    factory.getItem = function(key){
        return localStorageService.get(key);
    }

    factory.addItem = function(key, value){
        return localStorageService.set(key, value);
    }

    factory.removeItem = function(key){
        localStorageService.remove(key);
    }

    return factory;
}]);


services.factory('userService',['$http', function ($http) {
    var factory = {};

    factory.login = function(username,pass) {
        var promise = $http({method: 'POST',
                url: '/login',
                params: {"username":username,"pass":pass}
            })
            .success(function (data, status, headers, config) {
                console.log("Success login");
                return data;
            })
            .error(function (data, status, headers, config) {
                console.log("Error login");
                return data;
            });
        return promise;
    }

    factory.register = function(username,pass) {
        var promise = $http({method: 'POST',
                url: '/register',
                params: {"username":username,"pass":pass}
            })
            .success(function (data, status, headers, config) {
                console.log("Success getting price");
                return data;
            })
            .error(function (data, status, headers, config) {
                console.log("Error getting price");
                return data;
            });
        return promise;
    }

    factory.issueCoupon = function() {
        var promise = $http({method: 'POST',
                url: '/issueCoupon',
            })
            .success(function (data, status, headers, config) {
                console.log("Success issueCoupon");
                return data;
            })
            .error(function (data, status, headers, config) {
                console.log("Error issueCoupon");
                return data;
            });
        return promise;
    }

    return factory;
}]);

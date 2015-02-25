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
                console.log("Success regsitering user");
                return data;
            })
            .error(function (data, status, headers, config) {
                console.log("Error registering user");
                return data;
            });
        return promise;
    }

    factory.changePass = function(username,newPass) {
        var promise = $http({method: 'POST',
                url: '/changePass',
                params: {"username":username,"newPassword":newPass}
            })
            .success(function (data, status, headers, config) {
                console.log("Success regsitering user");
                return data;
            })
            .error(function (data, status, headers, config) {
                console.log("Error registering user");
                return data;
            });
        return promise;
    }

    factory.issueCoupon = function(issueAmount, expirationDate) {
        var promise = $http({method: 'POST',
                url: '/issueCoupon',
                params: {"issueAmount":issueAmount, "expiration":expirationDate}
            })
            .success(function (data, status, headers, config) {
                console.log("Success issuing Coupon");
                return data;
            })
            .error(function (data, status, headers, config) {
                console.log("Error issuing Coupon");
                return data;
            });
        return promise;
    }

    return factory;
}]);

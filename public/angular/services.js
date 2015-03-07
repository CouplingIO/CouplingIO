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

    factory.myUser = function() {
        var promise = $http({method: 'GET',
                url: '/myUser',
                params: {}
            })
            .success(function (data, status, headers, config) {
                console.log("Succes getting my user");
                return data;
            })
            .error(function (data, status, headers, config) {
                console.log("Error getting my user");
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


services.factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
        },
        register: function(user, success, error) {
            $http.post('/register', user).success(function(res) {
                changeUser(res);
                success();
            }).error(error);
        },
        login: function(user, success, error) {
            $http.post('/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});

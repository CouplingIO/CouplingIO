var controllers = angular.module('couplingIO.controllers', []);

controllers.controller('homeController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('homeController init');


    $scope.createWallet = function(){
        userService.createWallet().then(function(promise){
            console.log(promise.data);
        });
    }
}]);

controllers.controller('loginController', ['$scope','userService','sessionStorage', '$location', '$window', 'Auth', function($scope, userService, sessionStorage, $location, $window, Auth) {
    console.log('loginController init');

    $scope.userOnline = false;

    $scope.logIn = function(){
        userService.login("augusto","password").then(function(promise){
            console.log(promise.data);
            if (promise.data.success){
                $rootScope.userOnline = true;
            }
        });
    }

    $scope.rememberme = true;

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };

}]);

controllers.controller('registerController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    $scope.registerUser = function(){
        userService.register($scope.newUsername,$scope.newPassword).then(function(promise){
            console.log(promise.data);
        });
    }

    $scope.changePassword = function(){
        userService.changePass($scope.newUsername,$scope.newPassword).then(function(promise){
            console.log(promise.data);
        });
    }

    console.log('registerController init');
}]);

controllers.controller('issueCouponController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('issueCouponController init');

    $scope.issueCoupon = function(coupon){
        userService.issueCoupon(coupon.issueAmount, coupon.expirationDate).then(function(promise){
            console.log(promise.data)
        });
        console.log("Coupon issued");
    }
}]);

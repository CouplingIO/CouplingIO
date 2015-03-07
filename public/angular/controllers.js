var controllers = angular.module('couplingIO.controllers', []);

controllers.controller('homeController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('homeController init');
    userService.myUser().then(function(promise){
        $scope.myUser = promise.data;
    });
    $scope.createWallet = function(){
        userService.createWallet().then(function(promise){
            console.log(promise.data);
        });
    }

}]);

controllers.controller('enterController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('enterController init');
    $scope.passwordError = false;
    $scope.enterFB = function(){
        userService.enterFB().then(function(promise){
            console.log(promise.data);
        });
    }

    $scope.linkFB = function(){
        userService.linkFB('id').then(function(promise){
            console.log(promise.data);
        });
    }
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

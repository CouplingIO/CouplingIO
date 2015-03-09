var controllers = angular.module('couplingIO.controllers', []);

controllers.controller('homeController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('homeController init');
    userService.myUser().then(function(promise){
        console.log(promise.data);
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
}]);

controllers.controller('myProfileController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('myProfileController init');
    userService.myUser().then(function(promise){
        console.log(promise.data);
        $scope.myUser = promise.data;
    });
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

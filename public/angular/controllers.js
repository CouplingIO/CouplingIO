var controllers = angular.module('couplingIO.controllers', []);

controllers.controller('homeController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('homeController init'); 
    $scope.userOnline = false; 
    
    $scope.logIn = function(){
        userService.login("augusto","password").then(function(promise){
            console.log(promise.data);
            if (promise.data.success){
                $scope.userOnline = true;
            }
        });
    }
}]);

controllers.controller('loginController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('loginController init');
}]);

controllers.controller('registerController', ['$scope','userService','sessionStorage', function($scope,userService,sessionStorage) {
    console.log('registerController init');
}]);



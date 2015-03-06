var app = angular.module('couplingIO', ['couplingIO.controllers','couplingIO.directives','couplingIO.services', 'ngRoute','LocalStorageModule', 'ngCookies']);

//Local Storage
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('couplingIO')
    .setStorageType('localStorage')
    .setNotify(true, true)
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: '/partials/home.html', controller:'homeController'});
    $routeProvider.when('/home', { templateUrl: '/partials/home.html', controller:'homeController'});
    $routeProvider.when('/enter', { templateUrl: '/partials/enter.html', controller:'enterController'});
    $routeProvider.when('/issueCoupon', { templateUrl: '/partials/issueCoupon.html', controller:'issueCouponController'});
    //Otherwise
    //$routeProvider.otherwise({redirectTo: '/404'});
}]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

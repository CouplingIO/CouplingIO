var app = angular.module('couplingIO', ['couplingIO.controllers','couplingIO.directives','couplingIO.services', 'ngRoute','LocalStorageModule']);

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
    $routeProvider.when('/login', { templateUrl: '/partials/login.html', controller:'loginController'}); 
    $routeProvider.when('/register', { templateUrl: '/partials/register.html', controller:'registerController'}); 
    //Otherwise
    $routeProvider.otherwise({redirectTo: '/'});
}]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);    

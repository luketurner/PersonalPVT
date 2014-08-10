var pvtApp = angular.module("pvtApp", [
    'mgcrea.ngStrap',
    'ngRoute',
    'ngAnimate'
]);

pvtApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when('/pretrial', {
            templateUrl: 'pretrial/pretrial.html',
            controller: 'PreTrialCtrl'
        })
        .when('/trial', {
            templateUrl: 'trial/trial.html',
            controller: 'TrialCtrl'
        })
        .when('/results', {
            templateUrl: 'results/results.html',
            controller: 'ResultsCtrl'
        })
        .when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/history', {
            templateUrl: 'history/history.html',
            controller: 'HistoryCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }
]);
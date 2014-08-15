var pvtApp = angular.module("pvtApp", [
    'mgcrea.ngStrap',
    'ui.router',
    'ngAnimate'
]);

pvtApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('pretrial', {
        url: '/pretrial',
        templateUrl: 'pretrial/pretrial.html',
        controller: 'PreTrialCtrl'
    })
    .state('trial', {
        url: '/trial',
        templateUrl: 'trial/trial.html',
        controller: 'TrialCtrl'
    })
    .state('results', {
        url: '/results',
        templateUrl: 'results/results.html',
        controller: 'ResultsCtrl'
    })
    .state('results.trial', {
        url: '/:trialId',
        templateUrl: 'results/results.trial.html',
        controller: 'ResultsTrialCtrl'
    })
    .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    })
}]);

pvtApp.config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
}]);
var pvtApp = angular.module("pvtApp", [
    'mgcrea.ngStrap',
    'ui.router',
    'ngAnimate'
]);

// Fixing Angular issue that breaks blob links
pvtApp.config(function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
});

pvtApp.config(function ($stateProvider) {
    $stateProvider.state('pretrial', {
        url: '/pretrial',
        template: "<div ui-view></div>",
        controller: 'PreTrialCtrl'
    })
    .state('pretrial.instructions', {
        url: '/instructions',
        templateUrl: 'pretrial/pretrial.instructions.html',
        controller: 'PreTrialInstructionsCtrl'
    })
    .state('pretrial.countdown', {
        url: '/countdown',
        templateUrl: 'pretrial/pretrial.countdown.html',
        controller: 'PreTrialCountdownCtrl'
    })
    .state('settings', {
        url: '/settings',
        templateUrl: 'settings/settings.html',
        controller: 'SettingsCtrl'
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
    .state('results.all', {
        templateUrl: 'results/results.all.html',
        controller: 'AllResultsCtrl'
    })
    .state('results.empty', {
        templateUrl: 'results/results.empty.html'
    })
    .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    })
});

pvtApp.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
});
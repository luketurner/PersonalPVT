var pvtApp = angular.module("pvtApp", [
    'mgcrea.ngStrap',
    'ngRoute',
    'ngAnimate',
    'pvtControllers',
    'pvtServices'
]);

pvtApp.constant('colorSchemes', {
    dark: {
        fore: '#fff',
        back: '#000'
    },
    light: {
        fore: '#000',
        back: '#fff'
    }
});

pvtApp.factory('trialSettings', function () {
    return {
        trial_length: 600,
        color_scheme: 'dark'
    };
});


pvtApp.directive('timerDisplay', ["$timeout", 'trialTimer', function ($timeout, trialTimer) {
    return {
        scope: { },
        restrict: 'E',
        template: "<div ng-if='showTimer'>{{ value }}</div>",
        link: function (scope, element, attrs) {
            trialTimer.onStart.add(function () {
                scope.showTimer = true;
            });

            trialTimer.onStop.add(function (value) {
                scope.value = value;
                $timeout(function () {
                    if (!trialTimer.started) {
                        scope.showTimer = false;
                    }
                }, 1000)
            });

            trialTimer.onTick.add(function (value) {
                scope.value = value;
            });
        }
    };
}]);

pvtApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when('/pretrial', {
            templateUrl: 'views/pretrial.html',
            controller: 'PreTrialCtrl'
        })
        .when('/trial', {
            templateUrl: 'views/trial.html',
            controller: 'TrialCtrl'
        })
        .when('/results', {
            templateUrl: 'views/results.html',
            controller: 'ResultsCtrl'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }
]);
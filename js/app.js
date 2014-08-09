var pvtApp = angular.module("pvtApp", [
    'mgcrea.ngStrap',
    'ngRoute',
    'ngAnimate',
    'pvtControllers',
    'pvtServices'
]);

pvtApp.factory('trialSettings', function () {
    return {
        trial_length: 600
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

pvtApp.directive('sessionChart', [function () {
    return {
        scope: {
            data: "=",
            options: "="
        },
        restrict: 'E',
        template: '<canvas width="500" height="200" style="width: 500px; height: 200px"></canvas>',
        link: function (scope, element, attrs) {
            var canvas = $(element).find("canvas")[0];
            var labels = [];
            for (var i = 0; i < scope.data.length; i++) {
                labels.push(i);
            }

            var options = $.extend({
                datasetStroke: false,
                datasetFill: false,
                bezierCurve: false,
                pointHitDetectionRadius: 0,
                showScale: false
            }, scope.options);

            var data = {
                labels: labels,
                datasets: [{
                    data: scope.data,
                    pointColor: "black",
                    strokeColor: "rgba(0,0,0,0)"
                }]
            };
            var chart = new Chart(canvas.getContext("2d")).Line(data, options);
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
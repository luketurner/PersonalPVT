var pvtApp = angular.module("pvtApp", [
    'mgcrea.ngStrap',
    'ngRoute',
    'pvtControllers'
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

pvtApp.factory('trialData', function () {
    return {
        'times': []
    }
});

pvtApp.directive('trialTimer', ['$timeout', '$interval', 'trialData', 'trialSettings', function ($timeout, $interval, trialData, trialSettings) {
    return {
        scope: {
            onClose: "&onClose"
        },
        template: "<div ng-show='enabled'>{{timer}}</div><button type='button' class='close'>&times;</div>",
        link: function (scope, element, attrs) {

            var getRandom = function () {
                return Math.random() * 7 * 1000;
            };

            var enable = function () {
                scope.enabled = true;
                var startTime = Date.now();
                scope.timer = 0;

                updater = $interval(function () {
                    scope.timer = Date.now() - startTime;
                }, 10);

                element.one('click', function () {

                    $interval.cancel(updater);
                    var time = Date.now() - startTime;
                    trialData.times.push(time);
                    $timeout(function () {
                        scope.enabled = false;
                        if (Date.now() < doneTime) {
                            promise = $timeout(enable, getRandom());
                        }
                    }, 1000);
                });
            };

            var doneTime = Date.now() + (trialSettings.trial_length * 1000);
            scope.enabled = false;
            var updater;

            element.find("button").on("click", function () {
                $timeout.cancel(promise);
                $interval.cancel(updater);
                scope.onClose(scope, element);
            });

            var promise = $timeout(enable, getRandom());

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
        .otherwise({
            redirectTo: '/home'
        });
    }
]);
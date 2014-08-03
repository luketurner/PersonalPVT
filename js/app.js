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

pvtApp.factory('trialTimer', ['$timeout', '$interval', function ($timeout, $interval) {
    var getRandom = function () {
        return Math.random() * 7 * 1000;
    };
    var enabled = false;
    var started = false;
    var timer = 0;
    var intervalPromise;
    var timeoutPromise;
    var donePromise;
    var startTime = 0;
    var self = {
            onEnable: $.Callbacks(),
            onDisable: $.Callbacks(),
            onStart: $.Callbacks(),
            onStop: $.Callbacks(), // is passed the ms reaction time
            onTick: $.Callbacks() // is passed a ms timer value
        };

    self.enable = function (duration) {
        enabled = true;
        // If passed duration, then set a timeout to turn it off after that duration.
        if (duration) {
            donePromise = $timeout(self.disable, duration);
        }

        timeoutPromise = $timeout(self.start, getRandom());
        self.onEnable.fire();
    };

    self.disable = function () {
        enabled = false;
        $timeout.cancel(timeoutPromise);
        $timeout.cancel(donePromise);
        $interval.cancel(intervalPromise);
        self.onDisable.fire();
    };

    self.start = function () {

        if (!enabled) return;
        startTime = Date.now();
        started = true;

        // start ticking timer
        intervalPromise = $interval(function () {
            timer = Date.now() - startTime;
            self.onTick.fire(timer);
        }, 10);

        self.onStart.fire();
    };

    self.stop = function () {
        if (!enabled || !started) return;
        started = false;
        var time = Date.now() - startTime;

        // stop ticking timer
        $interval.cancel(intervalPromise);

        timeoutPromise = $timeout(self.start, getRandom() + 1000);

        self.onStop.fire(time);
    };
    return self;
}]);

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
        .otherwise({
            redirectTo: '/home'
        });
    }
]);
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
        .when('/signup', {
            templateUrl: 'signup/signup.html',
            controller: 'SignUpCtrl'
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }
]);
angular.module('pvtApp').factory('authenticator', function () {
    var auth = {};

    // Tries to create an account.
    // Returns a promise that is resolved if the creation was successful, and rejected otherwise.
    auth.createAccount = function (user, pass) {
        var resp = $.Deferred();
        if (user === "test" || user === "") { // pretend this is DB access code
            resp.reject();
        } else {
            resp.resolve();
        }

        return resp.promise();
    };

    // Tries to login with given credentials.
    // Returns a promise that is resolved if login was successful, and rejected otherwise
    auth.login = function (user, pass) {
        var resp = $.Deferred();
        if (user === "" || pass === "") {
            resp.reject();
        }
        if (user === pass) { // dummy logic
            resp.resolve();
        } else {
            resp.reject();
        }

        return resp.promise();
    };

    return auth;
});
angular.module("pvtApp").directive('scatterPlot', [function () {
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
angular.module('pvtApp').factory('trialData', function () {
    var trialData = {
        'times': []
    };

    trialData.mean = function (xs) {
        if (!xs) xs = this.times;
        return xs.reduce(function (sum,x) {sum + x}, 0) / xs.length;
    };

    trialData.max = function (xs) {
        if (!xs) xs = this.times;
        return Math.max.apply(null, xs);
    };

    trialData.min = function (xs) {
        if (!xs) xs = this.times;
        return Math.min.apply(null, xs);
    };

    trialData.stdDev = function (xs) {
        if (!xs) xs = this.times;
        var mean = this.mean(xs);
        var squareError = function (acc, x) { return acc + Math.pow(x - mean, 2); };
        return Math.sqrt(xs.reduce(squareError) / xs.length)
    };

    trialData.topTenPercent = function (xs) {
        if (!xs) xs = this.times;
        return xs.slice(0).sort().slice(0, Math.round(xs.length / 10))
    };

    trialData.bottomTenPercent = function (xs) {
        if (!xs) xs = this.times;
        return xs.slice(0).sort().slice(Math.round(xs.length / 10))
    };

    return trialData;
});
angular.module("pvtApp").factory('trialSettings', function () {
    return {
        trial_length: 600
    };
});

angular.module("pvtApp").directive('timerDisplay', ["$timeout", 'trialTimer', function ($timeout, trialTimer) {
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
angular.module('pvtApp').factory('trialTimer', ['$timeout', '$interval', function ($timeout, $interval) {
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
        $timeout.cancel(timeoutPromise);
        $timeout.cancel(donePromise);
        $interval.cancel(intervalPromise);
        enabled = false;
        started = false;
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

    self.reset = function () {
        self.onStart.empty();
        self.onStop.empty();
        self.onEnable.empty();
        self.onDisable.empty();
        self.onTick.empty();
    };

    return self;
}]);
angular.module('pvtApp').controller('LoginCtrl', ['$scope', 'authenticator', function ($scope, authenticator) {
    $scope.username = "";
    $scope.password = "";
    $scope.passwordValid = true;
    $scope.userValid = true;

    $scope.verifyPassword = function () {
        $scope.passwordValid = $scope.password.length > 0;
    };

    $scope.verifyUsername = function () {
        $scope.userValid = $scope.username.length > 0;
    };

    $scope.submit = function () {
        if ($scope.userValid && $scope.passwordValid) {
            authenticator.login($scope.username, $scope.password)
                .done(function () {
                    alert("logged in");
                })
                .fail(function () {
                    $scope.userValid = false;
                    $scope.passwordValid = false;
                });
        }
    };
}]);

angular.module('pvtApp').controller('HomeCtrl', ['$scope', function ($scope) {

}]);

angular.module('pvtApp').controller('PreTrialCtrl', ['$scope', 'trialSettings',
    function ($scope, trialSettings) {
        $scope.settings = trialSettings;
}]);
angular.module('pvtApp').controller('ResultsCtrl', ['$scope', "trialData", function ($scope, trialData) {
    $scope.times = trialData.times;
    $scope.chartData = [];
    for (var i = 0; i < 100; i++) { $scope.chartData.push( Math.random() * 1000); } // some junk data for testing
    $scope.chartSettings = {};
}]);

angular.module('pvtApp').controller('SignUpCtrl', ['$scope', 'authenticator', function ($scope, authenticator) {
    $scope.username = "";
    $scope.password = "";
    $scope.password2 = "";
    $scope.passwordValid = true;
    $scope.userValid = true;

    $scope.verifyPassword = function () {
        $scope.passwordValid = $scope.password === $scope.password2;
    };

    $scope.verifyUsername = function () {
        $scope.userValid = $scope.username.length > 0;
    };

    $scope.submit = function () {
        if ($scope.userValid && $scope.passwordValid) {
            authenticator.createAccount($scope.username, $scope.password)
                .done(function () {
                    alert("logged in");
                })
                .fail(function () {
                    $scope.userValid = false;
                });
        }
    };
}]);
angular.module('pvtApp').controller('TrialCtrl', ['$scope', '$location', '$document', 'trialTimer', 'trialData', function ($scope, $location, $document, trialTimer, trialData) {
    $scope.data = trialData;
    $scope.timer = trialTimer;
    trialTimer.reset();

    var keyBindHandler = function (e) {
        if (e.keyCode === 32) { // <Space>
            trialTimer.stop();
        }
        if (e.keyCode === 27) { // <Esc>
            trialTimer.disable();
        }
    };

    var mouseHandler = function () { trialTimer.stop(); return true; };

    trialTimer.onStop.add(function (value) {
        if (value) { trialData.times.push(value); }
    });

    trialTimer.onDisable.add(function () {
        $scope.$apply(function () {
            $document.off("keydown", keyBindHandler);
            $document.off("click", mouseHandler);
            $location.path('/results');
        });
    });

    trialTimer.enable(60 * 1000);
    $document.on("keydown", keyBindHandler);
    $document.on("click", mouseHandler);
}]);
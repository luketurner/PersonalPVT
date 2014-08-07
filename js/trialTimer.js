var pvtServices = angular.module('pvtServices');

pvtServices.factory('trialTimer', ['$timeout', '$interval', function ($timeout, $interval) {
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

    self.reset = function () {
        self.onStart.empty();
        self.onStop.empty();
        self.onEnable.empty();
        self.onDisable.empty();
        self.onTick.empty();
    };

    return self;
}]);
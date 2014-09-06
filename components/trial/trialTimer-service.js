angular.module('pvtApp').factory('trialTimer', function ($timeout, $interval) {
    var getRandom = function () {
        return (Math.random() * 6 * 1000) + 4000;
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
        if (enabled) return;
        enabled = true;
        // If passed duration, then set a timeout to turn it off after that duration.
        if (duration) {
            donePromise = $timeout(self.disable, duration);
        }

        timeoutPromise = $timeout(self.start, getRandom());
        self.onEnable.fire();
    };

    self.disable = function () {
        if (!enabled) return;
        $timeout.cancel(timeoutPromise);
        $timeout.cancel(donePromise);
        $interval.cancel(intervalPromise);
        enabled = false;
        started = false;
        self.onDisable.fire();
    };

    self.start = function () {
        if (!enabled || started) return;
        startTime = Date.now();
        started = true;

        // start ticking timer
        intervalPromise = $interval(function () {
            timer = Date.now() - startTime;
            self.onTick.fire(timer);
        }, 25);

        self.onStart.fire();
    };

    self.stop = function () {
        if (!enabled || !started) return;
        started = false;
        var time = Date.now() - startTime;

        // stop ticking timer
        $interval.cancel(intervalPromise);

        timeoutPromise = $timeout(self.start, getRandom());
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
});
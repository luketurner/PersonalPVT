angular.module("pvtApp").directive('timerDisplay', function ($timeout, trialTimer) {
    return {
        scope: { },
        restrict: 'E',
        template: "<div ng-if='showTimer'>{{ value }}</div>",
        link: function (scope, element, attrs) {
            var timeoutPromise;

            var timerStart = function () {
                scope.showTimer = true;
            };

            var timerStop = function (value) {
                scope.value = value;
                timeoutPromise = $timeout(function () {
                    if (!trialTimer.started) {
                        scope.showTimer = false;
                    }
                }, 1000);
            };

            var timerTick = function (value) {
                scope.value = value;
            };

            trialTimer.onStart.add(timerStart);
            trialTimer.onStop.add(timerStop);
            trialTimer.onTick.add(timerTick);

            element.on("$destroy", function () {
                if (timeoutPromise) { $timeout.cancel(timeoutPromise); }
                trialTimer.onStart.remove(timerStart);
                trialTimer.onStop.remove(timerStop);
                trialTimer.onTick.remove(timerTick)
            });
        }
    };
});
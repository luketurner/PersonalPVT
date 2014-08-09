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
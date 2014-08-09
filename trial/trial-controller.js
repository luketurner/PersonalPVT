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
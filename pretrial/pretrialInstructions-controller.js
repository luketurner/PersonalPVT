angular.module('pvtApp').controller('PreTrialInstructionsCtrl', function ($scope, $timeout, $state, trialTimer, settings) {
    var autoResponder;
    var getRandom = function () {
        return Math.random() * 0.8 * 1000 + 200;
    };

    trialTimer.reset();

    trialTimer.onStart.add(function () {
        autoResponder = $timeout(function () {
            trialTimer.stop();
        }, getRandom());
    });

    trialTimer.onDisable.add(function () {
        $timeout.cancel(autoResponder);
    });

    $scope.nextStep = function () {
        trialTimer.disable();
        $state.go("^.countdown");
    };

    $scope.settings = settings;
    trialTimer.enable(10000 * 1000);

});
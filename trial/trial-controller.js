angular.module('pvtApp').controller('TrialCtrl', ['$scope', '$state', '$document', 'trialTimer', 'trialStore',
    function ($scope, $state, $document, trialTimer, trialStore) {
    $scope.data = [];
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
        if (value) { $scope.data.push(value); }
    });

    trialTimer.onDisable.add(function () {
        $document.off("keydown", keyBindHandler);
        $document.off("click", mouseHandler);
        var date = trialStore.save($scope.data);
        $state.go('results.trial', { trialId: date }); // loads most recent result
    });

    trialTimer.enable(60 * 1000);
    $document.on("keydown", keyBindHandler);
    $document.on("click", mouseHandler);
}]);
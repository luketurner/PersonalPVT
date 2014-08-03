var pvtControllers = angular.module('pvtControllers', [])

pvtControllers.controller('PreTrialCtrl', ['$scope', 'trialSettings', 'colorSchemes',
    function ($scope, trialSettings, colorSchemes) {
        $scope.settings = trialSettings;
        $scope.color_schemes = colorSchemes;
}]);

pvtControllers.controller('ResultsCtrl', ['$scope', "trialData", function ($scope, trialData) {
    $scope.times = trialData.times;
}]);

pvtControllers.controller('TrialCtrl', ['$scope', '$location', '$document', 'trialTimer', 'trialData', function ($scope, $location, $document, trialTimer, trialData) {
    $scope.data = trialData;
    $scope.timer = trialTimer;

    var keyBindHandler = function (e) {
        if (e.keyCode === 32) { // <Space>
            trialTimer.stop();
        }
        if (e.keyCode === 27) { // <Esc>
            trialTimer.disable();
        }
    };

    var mouseHandler = function () { trialTimer.stop(); };

    trialTimer.onStop.add(function (value) {
        trialData.times.push(value);
    });

    trialTimer.onDisable.add(function () {
        $document.off("keydown", keyBindHandler);
        $document.off("click", mouseHandler);
        $location.path('/results');
    });

    trialTimer.enable(60 * 1000);
    $document.on("keydown", keyBindHandler);
    $document.on("click", mouseHandler);
}]);

pvtControllers.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.settings = {
        'test': 'asdf'
    };
}]);
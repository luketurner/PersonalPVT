var pvtControllers = angular.module('pvtControllers', [
    'pvtServices'
]);

pvtControllers.controller('PreTrialCtrl', ['$scope', 'trialSettings',
    function ($scope, trialSettings) {
        $scope.settings = trialSettings;
}]);

pvtControllers.controller('ResultsCtrl', ['$scope', "trialData", function ($scope, trialData) {
    $scope.times = trialData.times;
    $scope.chartData = [];
    for (var i = 0; i < 100; i++) { $scope.chartData.push( Math.random() * 1000); } // some junk data for testing
    $scope.chartSettings = {};
}]);

pvtControllers.controller('TrialCtrl', ['$scope', '$location', '$document', 'trialTimer', 'trialData', function ($scope, $location, $document, trialTimer, trialData) {
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

pvtControllers.controller('HomeCtrl', ['$scope', function ($scope) {

}]);

pvtControllers.controller('SignUpCtrl', ['$scope', 'authens', function ($scope, authens) {
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
            authens.createAccount($scope.username, $scope.password)
                .done(function () {
                    alert("logged in");
                })
                .fail(function () {
                    $scope.userValid = false;
                });
        }
    };
}]);

pvtControllers.controller('LoginCtrl', ['$scope', 'authens', function ($scope, authens) {
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
            authens.login($scope.username, $scope.password)
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
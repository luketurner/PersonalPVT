var pvtControllers = angular.module('pvtControllers', [
    'pvtServices'
]);

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
    trialTimer.reset();

//    trialTimer.onStart.add(function () { console.log("start"); });
//    trialTimer.onStop.add(function () { console.log("stop"); });
//    trialTimer.onEnable.add(function () { console.log("enable"); });
//    trialTimer.onDisable.add(function () { console.log("disable"); });

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
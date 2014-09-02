angular.module('pvtApp').controller('SettingsCtrl', function ($scope, $window, settings) {
    $scope.settings = settings;
    $scope.back = function () {
        $window.history.back();
    };
});

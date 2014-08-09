angular.module('pvtApp').controller('LoginCtrl', ['$scope', 'authenticator', function ($scope, authenticator) {
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
            authenticator.login($scope.username, $scope.password)
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

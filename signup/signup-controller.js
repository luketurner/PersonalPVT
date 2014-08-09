angular.module('pvtApp').controller('SignUpCtrl', ['$scope', 'authenticator', function ($scope, authenticator) {
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
            authenticator.createAccount($scope.username, $scope.password)
                .done(function () {
                    alert("logged in");
                })
                .fail(function () {
                    $scope.userValid = false;
                });
        }
    };
}]);
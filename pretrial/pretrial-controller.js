angular.module('pvtApp').controller('PreTrialCtrl', ['$scope', '$timeout', '$interval', '$state', function ($scope, $timeout, $interval, $state) {
    $scope.seconds = 5;

    var countdown = $interval(function () {
        $scope.seconds -= 1;
    }, 1000);

    $timeout(function () {
        $interval.cancel(countdown);
        $state.go("trial");
    }, $scope.seconds * 1000);
}]);
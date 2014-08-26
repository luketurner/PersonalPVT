angular.module('pvtApp').controller('PreTrialCountdownCtrl', ['$scope', '$timeout', '$interval', '$state', function ($scope, $timeout, $interval, $state) {
    $scope.seconds = 5;

    var countdown = $interval(function () {
        $scope.seconds -= 1;
    }, 1000);

    $timeout(function () {
        $interval.cancel(countdown);
        if($state.is("pretrial.countdown")) {
            $state.go("trial");
        }
    }, $scope.seconds * 1000);
}]);
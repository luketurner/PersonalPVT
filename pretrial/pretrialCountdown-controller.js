angular.module('pvtApp').controller('PreTrialCountdownCtrl', function ($scope, $timeout, $interval, $window, $state) {
    $scope.seconds = 5;
    $scope.back = function () {
        $window.history.back();
    };

    var countdown = $interval(function () {
        $scope.seconds -= 1;
    }, 1000);

    $timeout(function () {
        $interval.cancel(countdown);
        if($state.is("pretrial.countdown")) {
            $state.go("trial");
        }
    }, $scope.seconds * 1000);
});
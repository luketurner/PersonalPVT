angular.module('pvtApp').controller('ResultsCtrl', ['$scope', "trialData", "trialStore", function ($scope, trialData, trialStore) {
    $scope.trialData = trialData;
    $scope.saved = false;

    $scope.chartData = [];
    $scope.chartSettings = {};

    $scope.saveData = function () {
        $scope.saved = trialStore.save(trialData.times);
    };

    for (var i = 0; i < 100; i++) { $scope.chartData.push( Math.random() * 1000); } // some junk data for testing
    trialData.times = $scope.chartData;
}]);

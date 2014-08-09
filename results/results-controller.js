angular.module('pvtApp').controller('ResultsCtrl', ['$scope', "trialData", function ($scope, trialData) {
    $scope.times = trialData.times;
    $scope.chartData = [];
    for (var i = 0; i < 100; i++) { $scope.chartData.push( Math.random() * 1000); } // some junk data for testing
    $scope.chartSettings = {};
}]);

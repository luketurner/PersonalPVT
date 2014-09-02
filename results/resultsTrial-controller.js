
angular.module('pvtApp').controller('ResultsTrialCtrl', function ($scope, $stateParams, trialStore, analyzeData, settings) {
    $scope.data = analyzeData(trialStore.load($stateParams.trialId));
    $scope.lapseThreshold = settings.lapse_threshold;
    $scope.modifyThreshold = function (x) { $scope.lapseThreshold += x; settings.lapse_threshold += x; return false; }

});
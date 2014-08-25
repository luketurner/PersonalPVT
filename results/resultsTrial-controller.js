/**
 * Created by Luke on 8/25/2014.
 */
angular.module('pvtApp').controller('ResultsTrialCtrl', ['$scope', '$stateParams', 'trialStore', 'analyzeData', 'settings', function ($scope, $stateParams, trialStore, analyzeData, settings) {
    $scope.data = analyzeData(trialStore.load($stateParams.trialId));
    $scope.lapseThreshold = settings.lapse_threshold;
    $scope.modifyThreshold = function (x) { $scope.lapseThreshold += x; settings.lapse_threshold += x; return false; }

}]);
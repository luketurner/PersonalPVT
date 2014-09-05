
angular.module('pvtApp').controller('ResultsTrialCtrl', function ($scope, $window, $stateParams, trialStore, analyzeData, settings) {
    var data = trialStore.load($stateParams.trialId);
    $scope.data = analyzeData(data);
    $scope.trialId = $stateParams.trialId;
    $scope.lapseThreshold = settings.lapse_threshold;
    $scope.modifyThreshold = function (x) { $scope.lapseThreshold += x; settings.lapse_threshold += x; return false; }

    var csv_data = $stateParams.trialId + "," + data.join(",");
    $scope.downloadUrl = $window.URL.createObjectURL(new Blob([csv_data], { type: 'text/csv' }));

});
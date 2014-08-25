angular.module('pvtApp').controller('ResultsCtrl', ['$scope', '$state', 'trialStore', 'analyzeData', function ($scope, $state, trialStore, analyzeData) {
    $scope.trials = trialStore.all();

    if ($state.is("results") && $scope.trials.length > 0) {
        $state.go('.trial', {trialId: $scope.trials[0].date.getTime()});
    }

    $scope.titleForTrial = function (trial) {
        var date = new Date(trial.date);
        return date.getMonth()+"/"+date.getDay()+" ("+date.getTime()+")";
    };

    $scope.textForTrial = function (trial) {
        var data = analyzeData(trial.data);
        return "Mean: "+data.mean().toPrecision(4)+"  Lapses: "+data.lapses(750).length;
    };

    $scope.idForTrial = function (trial) {
        return trial.date.getTime()
    };

}])
.controller('ResultsTrialCtrl', ['$scope', '$stateParams', 'trialStore', 'analyzeData', function ($scope, $stateParams, trialStore, analyzeData) {
    $scope.data = analyzeData(trialStore.load($stateParams.trialId));
    $scope.chartSettings = {
        scaleShowGridLines: true
    };
}]);

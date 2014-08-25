angular.module('pvtApp').controller('ResultsCtrl', ['$scope', '$state', 'trialStore', 'analyzeData', 'settings', function ($scope, $state, trialStore, analyzeData, settings) {
    $scope.trials = trialStore.all();
    $scope.settings = settings;


    if ($state.is("results") && $scope.trials.length > 0) {
        $state.go('.all');
    }

    $scope.titleForTrial = function (trial) {
        var date = moment(trial.date);
        return date.format('MMM Do h:mm a');
    };

    $scope.getDateSpan = function (trials) {
        var date1 = moment(trials[0].date);
        var date2 = moment(trials[trials.length - 1].date);
        return date2.diff(date1, 'days');
    };

    $scope.textForTrial = function (trial) {
        var data = analyzeData(trial.data);
        return "Mean "+data.mean().toPrecision(4)+" | Lapses "+data.lapses(settings.lapse_threshold).length;
    };

    $scope.idForTrial = function (trial) {
        return trial.date.getTime();
    };

}]);
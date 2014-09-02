angular.module('pvtApp').controller('ResultsCtrl', function ($scope, $state, trialStore, analyzeData, settings) {
    $scope.trials = trialStore.all();
    $scope.settings = settings;

    if ($state.is("results")) {
        if ($scope.trials.length > 1) {
            $state.go('.all');
        }
        if ($scope.trials.length == 1) {
            $state.go('.trial', { trialId: $scope.trials[0].date });
        }
        else {
            $state.go(".empty");
        }
    }

    $scope.titleForTrial = function (trial) {
        var date = moment(trial.date);
        return date.format('MMM Do h:mm a');
    };

    $scope.getDateSpan = function (trials) {
        if (trials.length > 0) {
            var date1 = moment(trials[0].date);
            var date2 = moment(trials[trials.length - 1].date);
            return date2.diff(date1, 'days');
        }
        return 0;
    };

    $scope.textForTrial = function (trial) {
        var data = analyzeData(trial.data);
        return "Mean "+data.mean().toPrecision(4)+" | Lapses "+data.lapses(settings.lapse_threshold).length;
    };

    $scope.idForTrial = function (trial) {
        return trial.date;
    };

});
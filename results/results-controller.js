angular.module('pvtApp').controller('ResultsCtrl', function ($scope, $state, trialStore, analyzeData, settings, i18n) {
    $scope.trials = trialStore.all();
    $scope.settings = settings;

    if ($state.is("results")) {
        $state.go('.all');
    }

    $scope.titleForTrial = function (trial) {
        var date = moment(trial.date);
        return date.format(i18n.t('formats.trial_title'));
    };

    $scope.getDateSpan = function (trials) {
        if (trials.length > 0) {
            var date1 = moment(trials[0].date);
            var date2 = moment(trials[trials.length - 1].date);
            return date2.diff(date1, 'days') + 1;
        }
        return 0;
    };

    $scope.textForTrial = function (trial) {
        var data = analyzeData(trial.data);
        return i18n.t('results.summary.mean') + " " + data.mean().toPrecision(4) +
            " | " + i18n.t('results.summary.lapses') + " " + data.lapses(settings.lapse_threshold).length;
    };

    $scope.idForTrial = function (trial) {
        return trial.date;
    };

});
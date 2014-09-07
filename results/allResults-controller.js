angular.module("pvtApp").controller('AllResultsCtrl', function ($scope, $window, $stateParams, $state, $timeout, trialStore, analyzeData, settings) {
    var data = trialStore.all();
    var undoData = null;

    if (!data || data.length === 0) {
        $state.go("^.empty");
    }

    if (data.length === 1) {
        $state.go("^.trial", { 'trialId': data[0].date });
    }

    $scope.reallyDelete = function () {
        trialStore.deleteAll();
        // Following is a hack to replace $state.reload() because that doesn't reload controllers
        var current = $state.current;
        var params = angular.copy($stateParams);
        $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
    };

    $scope.lapseThreshold = settings.lapse_threshold;
    $scope.modifyThreshold = function (x) {
        $scope.lapseThreshold += x;
        settings.lapse_threshold += x;
        return false;
    };

    var means = data.map(function (x) { return analyzeData(x.data).mean(); });
    var lapses = data.map(function (x) { return analyzeData(x.data).lapses(settings.lapse_threshold).length; });
    var dates = data.map(function (x) { return moment(x.date).format("MMM Do h:mm"); });

    $scope.meanData = {
        labels: dates,
        datasets: [
            {
                label: "Mean",
                fillColor: "rgba(200,200,200,0.2)",
                strokeColor: "rgba(200,200,200,1)",
                pointColor: "rgba(200,200,200,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(200,200,200,1)",
                data: means
            }
        ]
    };

    $scope.lapseData = {
        labels: dates,
        datasets: [
            {
                label: "Lapses",
                fillColor: "rgba(150,150,150,0.2)",
                strokeColor: "rgba(150,150,150,1)",
                pointColor: "rgba(150,150,150,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(150,150,150,1)",
                data: lapses
            }
        ]
    };

    var csv_data = data.map(function (x) { return x.date + "," + x.data.join(","); }).join("\n");
    $scope.downloadUrl = $window.URL.createObjectURL(new Blob([csv_data], { type: 'text/csv' }));
});

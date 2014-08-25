/**
 * Created by Luke on 8/25/2014.
 */
angular.module('pvtApp').controller('ResultsTrialCtrl', ['$scope', '$stateParams', 'trialStore', 'analyzeData', 'settings', function ($scope, $stateParams, trialStore, analyzeData, settings) {
    $scope.data = analyzeData(trialStore.load($stateParams.trialId));
    $scope.lapseThreshold = settings.lapse_threshold;
    $scope.modifyThreshold = function (x) { $scope.lapseThreshold += x; settings.lapse_threshold += x; return false; }

}])
.controller('AllResultsCtrl', ['$scope', '$stateParams', 'trialStore', 'analyzeData', 'settings', function ($scope, $stateParams, trialStore, analyzeData, settings) {
    var data = trialStore.all();

    $scope.lapseThreshold = settings.lapse_threshold;
    $scope.modifyThreshold = function (x) {
        $scope.lapseThreshold += x;
        settings.lapse_threshold += x;
        return false;
    };

    var means = data.map(function (x) { return analyzeData(x.data).mean(); });
    var lapses = data.map(function (x) { return analyzeData(x.data).lapses(settings.lapse_threshold).length; });
    var dates = data.map(function (x) { return moment(x.date).format("MMM Do h:mm a"); });

    $scope.chartData = {
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
            },
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

}]);

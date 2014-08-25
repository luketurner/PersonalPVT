/**
 * Created by Luke on 8/25/2014.
 */
angular.module("pvtApp").controller('AllResultsCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'trialStore', 'analyzeData', 'settings', function ($scope, $stateParams, $state, $timeout, trialStore, analyzeData, settings) {
    var data = trialStore.all();
    var undoData = null;

    $scope.deleteMessage = "Delete All";

    var gotoMsg = function (i, delay) {
        if (!delay) {
            $scope.deleteMessage = messages[i];
            return;
        }
        $scope.deleteMessage = " ... ";
        $timeout(function () { $scope.deleteMessage = messages[i]; }, delay * 1000);
    };


    var messages = ["Delete All", "You sure?", "Double sure?",
        "You can't undo!", "Done. Undo?", "Sure?",
        "Double sure? ", "Like last time?", "Whatever.",
        "Say please", "Restored."];

    var reallyDeleteAll = function () {
        trialStore.deleteAll();
        $state.reload();
    };
    var undoDeleteAll = function () {
        trialStore.undoDelete();
        $state.reload();
    };

    if (trialStore.hasUndo()) {
        gotoMsg(4);
    }

    $scope.deleteAll = function () {
        switch ($scope.deleteMessage) {
            case messages[0]: return gotoMsg(1, 2); // delete all
            case messages[1]: return gotoMsg(2, 2); // sure?
            case messages[2]: return gotoMsg(3); // triple sure?
            case messages[3]: reallyDeleteAll(); return gotoMsg(4, 1); // you can't undo!
            case messages[4]: return gotoMsg(5, 1);  // Done, undo?
            case messages[5]: return gotoMsg(6, 1); // sure
            case messages[6]: return gotoMsg(7, 1); // triple sure?
            case messages[7]: return gotoMsg(8, 2); // like last time?
            case messages[8]: return gotoMsg(9, 2); // whatever
            case messages[9]: undoDeleteAll(); return gotoMsg(10, 1); // say please
        }
    };

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

angular.module('pvtApp').controller('ResultsCtrl', ['$scope', '$state', 'trialStore', function ($scope, $state, trialStore) {
    $scope.trials = trialStore.all();
    if ($state.is("results")) {
        $state.go('.trial', {trialId: $scope.trials[0].date.getTime()});
    }
}])
.controller('ResultsTrialCtrl', ['$scope', '$stateParams', 'trialStore', 'analyzeData', function ($scope, $stateParams, trialStore, analyzeData) {
    $scope.data = analyzeData(trialStore.load($stateParams.trialId));
}]);

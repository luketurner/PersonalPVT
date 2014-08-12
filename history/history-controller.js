angular.module('pvtApp').controller('HistoryCtrl', ["$scope", "trialStore", function ($scope, trialStore) {
    $scope.store = trialStore;
}]);

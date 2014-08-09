angular.module('pvtApp').controller('PreTrialCtrl', ['$scope', 'trialSettings',
    function ($scope, trialSettings) {
        $scope.settings = trialSettings;
}]);
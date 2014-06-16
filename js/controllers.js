var pvtControllers = angular.module('pvtControllers', [])

pvtControllers.controller('PreTrialCtrl', ['$scope', 'trialSettings', 'colorSchemes',
    function ($scope, trialSettings, colorSchemes) {
        $scope.settings = trialSettings;
        $scope.color_schemes = colorSchemes;
}]);

pvtControllers.controller('TrialCtrl', ['$scope', 'trialData', function ($scope, trialData) {
        $scope.data = trialData;
}]);

pvtControllers.controller('ResultsCtrl', ['$scope', function ($scope) {
    $scope.settings = {
        'test': 123
    };
}]);

pvtControllers.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.settings = {
        'test': 'asdf'
    };
}]);
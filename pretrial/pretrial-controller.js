angular.module('pvtApp').controller('PreTrialCtrl', ['$scope', '$state', 'settings', function ($scope, $state, settings) {
    if ($state.is("pretrial") ) {
        if (settings.show_instructions) {
            $state.go(".instructions");
        } else {
            $state.go(".countdown");
        }
    }
}]);
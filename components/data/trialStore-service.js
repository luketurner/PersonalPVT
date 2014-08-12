angular.module('pvtApp').factory('trialStore', ['$window', function ($window) {
    var trialStore = { };
    var prefix = "TRIAL";
    var store = $window.localStorage;

    trialStore.save = function (trialData) {
        // TODO - do we want to move this somewhere more appropriate?
        if (!(trialData && trialData.length > 0)) {
            return false;
        }
        var date = Date.now(); // A unique-enough identifier, also useful when loading
        store.setItem(prefix + ',' + date, trialData.join());
        return true;
    };

    trialStore.load = function (key) {
        return store.getItem(key).split(',');
    };

    trialStore.all = function () {
        var results = [];
        for (var i = 0; i < store.length; i++) {
            var key = store.key(i);
            if (key.substr(0, prefix.length) === prefix) {
                results.push({
                    'date': Date.parse(key.substr(prefix.length + 2)),
                    'data': trialStore.load(key)
                });
            }
        }
        return results;
    };

    return trialStore;
}]);
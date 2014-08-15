angular.module('pvtApp').factory('trialStore', ['$window', function ($window) {
    var trialStore = { };
    var prefix = "TRIAL";
    var store = $window.localStorage;

    trialStore.save = function (data) {
        if (!(data && data.length > 0)) {
            return false;
        }
        var date = Date.now(); // A unique-enough identifier, also useful when loading
        store.setItem(prefix + ',' + date, data.join());
        return date;
    };

    trialStore.load = function (id) {
        return store.getItem(prefix + ',' + id).split(',').map(parseFloat);
    };

    trialStore.all = function () {
        var results = [];
        for (var i = 0; i < store.length; i++) {
            var key = store.key(i);
            if (key.substr(0, prefix.length) === prefix) {
                results.push({
                    'date': new Date(parseInt(key.substr(prefix.length + 1))),
                    'data': store.getItem(key).split(',').map(parseFloat)
                });
            }
        }
        return results;
    };

    return trialStore;
}]);
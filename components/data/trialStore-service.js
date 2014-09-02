angular.module('pvtApp').factory('trialStore', function ($window) {
    var trialStore = { };
    var prefix = "TRIAL";
    var store = $window.localStorage;
    var undoData = null;

    trialStore.save = function (data, id) {
        if (!(data && data.length > 0)) {
            return false;
        }
        if (!id) id = Date.now(); // A unique-enough identifier, also useful when loading
        store.setItem(prefix + ',' + id, data.join());
        return id;
    };

    trialStore.load = function (id) {
        return store.getItem(prefix + ',' + id).split(',').map(parseFloat);
    };

    trialStore.remove = function (id) {
        return store.removeItem(prefix + ',' + id);
    };

    trialStore.all = function () {
        var results = [];
        for (var i = 0; i < store.length; i++) {
            var key = store.key(i);
            if (key.substr(0, prefix.length) === prefix) {
                results.push({
                    'date': parseInt(key.substr(prefix.length + 1)),
                    'data': store.getItem(key).split(',').map(parseFloat)
                });
            }
        }
        return results;
    };

    trialStore.deleteAll = function () {
        undoData = trialStore.all();
        $.each(undoData, function (i,v) {
            trialStore.remove(v.date);
        });
    };

    trialStore.undoDelete = function () {
        if (undoData) {
            $.each(undoData, function (i,v) {
                trialStore.save(v.data, v.date);
            });
            undoData = null;
        }
    };

    trialStore.hasUndo = function () { return undoData != null; };

    return trialStore;
});
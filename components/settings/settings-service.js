angular.module("pvtApp").factory('settings', function ($rootScope, $window) {
    var vals = {}; // holds actual setting values
    var settings = {}; // holds setting getters and setters (returned)
    var store = $window.localStorage;

    var makeSetting = function (name, default_value) {
        var newProp = {};

        // Create auto-saving setters for each value
        newProp[name] = {
            get: function () { return vals[name]; },
            set: function (x) { vals[name] = x; save(); }
        };
        Object.defineProperties(settings, newProp);

        // add default value to backing settings object
        vals[name] = default_value;
    };

    var save = function () {
        store.setItem("TRSETTINGS", JSON.stringify(vals));
    };

    // get saved settings

    var saved = JSON.parse(store.getItem("TRSETTINGS") || "{}");

    // Setting definitions

    makeSetting("lapse_threshold", saved.lapse_threshold || 500);
    makeSetting("trial_length", saved.trial_length || 600);
    makeSetting("show_instructions", saved.show_instructions === false ? false : true);

    return settings;
});

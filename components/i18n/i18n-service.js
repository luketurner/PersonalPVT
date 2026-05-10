angular.module("pvtApp").factory('i18n', function ($rootScope, $window) {
    var dictionaries = {};
    var displayNames = {};
    var FALLBACK = 'en';
    var currentLocale = FALLBACK;

    var register = function (code, displayName, dict) {
        dictionaries[code] = dict;
        displayNames[code] = displayName;
    };

    var detectBrowserLocale = function () {
        var nav = $window.navigator;
        var prefs = (nav.languages && nav.languages.slice())
            || [nav.language || nav.userLanguage || ''];
        for (var i = 0; i < prefs.length; i++) {
            var raw = (prefs[i] || '').toLowerCase();
            if (!raw) { continue; }
            if (dictionaries[raw]) { return raw; }
            var base = raw.split('-')[0];
            if (dictionaries[base]) { return base; }
        }
        return FALLBACK;
    };

    var lookup = function (dict, key) {
        var parts = key.split('.');
        var node = dict;
        for (var i = 0; i < parts.length; i++) {
            if (node == null) { return undefined; }
            node = node[parts[i]];
        }
        return typeof node === 'string' ? node : undefined;
    };

    var format = function (str, params) {
        if (!params) { return str; }
        return str.replace(/\{(\w+)\}/g, function (match, name) {
            return params.hasOwnProperty(name) ? params[name] : match;
        });
    };

    var t = function (key, params) {
        if (!key) { return ''; }
        var hit = lookup(dictionaries[currentLocale], key);
        if (hit === undefined && currentLocale !== FALLBACK) {
            hit = lookup(dictionaries[FALLBACK], key);
        }
        if (hit === undefined) { return key; }
        return format(hit, params);
    };

    var setLocale = function (code) {
        if (!dictionaries[code]) { code = FALLBACK; }
        if (code === currentLocale) { return; }
        currentLocale = code;
        // Sync moment's locale so date tokens like MMM render in the active language.
        // Falls back silently to the current moment locale if the locale file isn't loaded.
        if ($window.moment) { $window.moment.locale(code); }
        $rootScope.$broadcast('i18n.localeChanged', code);
    };

    return {
        register: register,
        detectBrowserLocale: detectBrowserLocale,
        setLocale: setLocale,
        getLocale: function () { return currentLocale; },
        getSupportedLocales: function () {
            var out = [];
            for (var code in dictionaries) {
                if (dictionaries.hasOwnProperty(code)) {
                    out.push({ code: code, name: displayNames[code] });
                }
            }
            return out;
        },
        t: t
    };
});

angular.module("pvtApp").filter('translate', function (i18n) {
    var translateFilter = function (key, params) {
        return i18n.t(key || '', params);
    };
    translateFilter.$stateful = true;
    return translateFilter;
});

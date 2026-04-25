// IMPORTANT: include this script AFTER all locale files in index.html so that
// detectBrowserLocale() can match against every registered language.
angular.module("pvtApp").run(function ($rootScope, settings, i18n) {
    var initial = settings.language || i18n.detectBrowserLocale();
    settings.language = initial;
    i18n.setLocale(initial);

    $rootScope.$watch(function () { return settings.language; }, function (newVal) {
        if (newVal) { i18n.setLocale(newVal); }
    });
});

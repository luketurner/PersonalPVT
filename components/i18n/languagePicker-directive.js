angular.module("pvtApp").directive('languagePicker', function (i18n, settings) {
    return {
        restrict: 'E',
        replace: true,
        template:
            '<div class="language-picker">' +
                '<select ng-model="settings.language" ' +
                        'ng-options="loc.code as loc.name for loc in locales"' +
                        ' aria-label="{{ \'settings.fields.language\' | translate }}">' +
                '</select>' +
            '</div>',
        link: function (scope) {
            scope.settings = settings;
            scope.locales = i18n.getSupportedLocales();
        }
    };
});

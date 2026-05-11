angular.module("pvtApp").directive('languagePicker', function (i18n, settings) {
    return {
        restrict: 'E',
        replace: true,
        template:
            '<div class="language-picker" role="group" ' +
                 'aria-label="{{ \'settings.fields.language\' | translate }}">' +
                '<button type="button" ' +
                        'ng-repeat="loc in locales" ' +
                        'ng-click="settings.language = loc.code" ' +
                        'ng-class="{\'is-selected\': settings.language === loc.code}" ' +
                        'aria-pressed="{{ settings.language === loc.code }}" ' +
                        'lang="{{ loc.code }}">' +
                    '{{ loc.name }}' +
                '</button>' +
            '</div>',
        link: function (scope) {
            scope.settings = settings;
            scope.locales = i18n.getSupportedLocales();
        }
    };
});

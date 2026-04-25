angular.module('pvtApp').directive('deleteAll', function ($timeout, $state, $q, i18n) {
    return {
        scope: {
            ondelete: '&onDelete'
        },
        restrict: 'E',
        template: '<a ng-click="step()" href="" class="text-danger">&lt; {{ message }} &gt;</a>',
        link: function (scope, element, attrs) {
            var acceptsInput = true;
            var messageIndex = 0;
            var loading = false;
            var timeoutPromise;
            var messages = [
                {key: "deleteAll.states.start",    wait: 2},
                {key: "deleteAll.states.confirm1", wait: 2},
                {key: "deleteAll.states.confirm2", wait: 0},
                {key: "deleteAll.states.warn",     wait: 1},
                {key: "deleteAll.states.done",     wait: 1, delete: true}
            ];

            var setMessage = function () {
                scope.message = loading
                    ? i18n.t("deleteAll.states.loading")
                    : i18n.t(messages[messageIndex].key);
            };

            element.on("$destroy", function () {
                if (timeoutPromise) { $timeout.cancel(timeoutPromise); }
            });

            scope.$on('i18n.localeChanged', setMessage);

            setMessage();
            scope.step = function () {
                if (!acceptsInput || messageIndex >= messages.length) {
                    return;
                }

                var msg = messages[++messageIndex];

                if (msg.delete) {
                    scope.ondelete();
                    hasUndo = true;
                }

                if (msg.wait === 0) {
                    loading = false;
                    setMessage();
                    return;
                }

                acceptsInput = false;
                loading = true;
                setMessage();
                timeoutPromise = $timeout(function () {
                    acceptsInput = true;
                    loading = false;
                    setMessage();
                }, msg.wait * 1000);
            };
        }
    };
});

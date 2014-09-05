angular.module('pvtApp').directive('deleteAll', function ($timeout, $state, $q) {
    return {
        scope: {
            ondelete: '&onDelete'
        },
        restrict: 'E',
        template: '<a ng-click="step()" href="" class="text-danger">&lt; {{ message }} &gt;</a>',
        link: function (scope, element, attrs) {
            var acceptsInput = true;
            var messageIndex = 0;
            var timeoutPromise;
            var messages = [
                {msg: "Delete All", wait: 2},
                {msg: "You sure?", wait: 2},
                {msg: "Double sure?", wait: 0},
                {msg: "You can't undo!", wait: 1},
                {msg: "Deleted", wait: 1, delete: true}
            ];

            element.on("$destroy", function () {
                if (timeoutPromise) { $timeout.cancel(timeoutPromise); }
            });

            scope.message = messages[messageIndex].msg;
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
                    scope.message = msg.msg;
                    return;
                }

                acceptsInput = false;
                scope.message = " ... ";
                timeoutPromise = $timeout(function () {
                    acceptsInput = true;
                    scope.message = msg.msg;
                }, msg.wait * 1000);
            };
        }
    };
});
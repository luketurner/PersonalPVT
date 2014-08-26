angular.module('pvtApp').directive('deleteAll', function ($timeout, $state, $q) {
    var messageIndex = 0;
    var hasUndo;
    var messages = [
        {msg: "Delete All", wait: 2},
        {msg: "You sure?", wait: 2},
        {msg: "Double sure?", wait: 0},
        {msg: "You can't undo!", wait: 1, delete: true},
        {msg: "Undo deletion?", wait: 1},
        {msg: "Sure?", wait: 1},
        {msg: "Double sure?", wait: 2},
        {msg: "Like last time?", wait: 0},
        {msg: "Whatever.", wait: 2, restore: true},
        {msg: "Restored", wait: 0}
    ];


    return {
        scope: {
            ondelete: '&',
            onrestore: '&'
        },
        restrict: 'E',
        template: '<a ng-click="step()" href="">&lt; {{ message }} &gt;</a>',
        link: function (scope, element, attrs) {
            var acceptsInput = true;

            if (hasUndo) {
                messageIndex = 4;
                hasUndo = false;
            } else {
                messageIndex = 0;
            }

            scope.message = messages[messageIndex].msg;
            scope.step = function () {
                if (!acceptsInput || messageIndex >= messages.length) {
                    return;
                }
                var msg = messages[messageIndex++];

                if (msg.delete) {
                    scope.ondelete();
                    hasUndo = true;
                }

                if (msg.restore) {
                    hasUndo = false;
                    scope.onrestore();
                    messageIndex = 0;
                }

                if (msg.wait === 0) {
                    scope.message = msg.msg;
                    return;
                }

                acceptsInput = false;
                scope.message = " ... ";
                $timeout(function () {
                    acceptsInput = true;
                    scope.message = msg.msg;
                }, msg.wait * 1000);
            };
        }
    };
});
angular.module("pvtApp").directive('scatterPlot', [function () {
    return {
        scope: {
            data: "=",
            options: "="
        },
        restrict: 'E',
        template: '<canvas width="500" height="200" style="width: 500px; height: 200px"></canvas>',
        link: function (scope, element, attrs) {
            var canvas = $(element).find("canvas")[0];
            var labels = [];
            for (var i = 0; i < scope.data.length; i++) {
                labels.push(i);
            }

            var options = $.extend({
                datasetStroke: false,
                datasetFill: false,
                bezierCurve: false,
                pointHitDetectionRadius: 0,
                showScale: false
            }, scope.options);

            var data = {
                labels: labels,
                datasets: [{
                    data: scope.data,
                    pointColor: "black",
                    strokeColor: "rgba(0,0,0,0)"
                }]
            };
            var chart = new Chart(canvas.getContext("2d")).Line(data, options);
        }
    };
}]);
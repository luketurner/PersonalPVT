angular.module("pvtApp").directive('scatterPlot', function ($document) {
    return {
        scope: {
            data: "=",
            options: "="
        },
        restrict: 'E',
        template: '<canvas width="400" height="150" style="width: 400px; height: 150px"></canvas>',
        link: function (scope, element, attrs) {
            if (!scope.data) {
                return;
            }

            var canvas = $(element).find("canvas")[0];

            if (scope.data.length) {

                var labels = [];
                for (var i = 0; i < scope.data.length; i++) {
                    labels.push(i);
                }

                var data = {
                    labels: labels,
                    datasets: [{
                        data: scope.data,
                        pointColor: "rgb(100,100,100)",
                        strokeColor: "rgba(0,0,0,0)"
                    }]
                };
            } else {
                var data = scope.data;
            }

            var options = $.extend({
                datasetStroke: false,
                datasetFill: false,
                bezierCurve: false,
                pointHitDetectionRadius: 0,
                showScale: false
            }, scope.options);


            var chart = new Chart(canvas.getContext("2d")).Line(data, options);
        }
    };
});
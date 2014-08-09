angular.module('pvtApp').factory('trialData', function () {
    var trialData = {
        'times': []
    };

    trialData.mean = function (xs) {
        if (!xs) xs = this.times;
        return xs.reduce(function (sum,x) {sum + x}, 0) / xs.length;
    };

    trialData.max = function (xs) {
        if (!xs) xs = this.times;
        return Math.max.apply(null, xs);
    };

    trialData.min = function (xs) {
        if (!xs) xs = this.times;
        return Math.min.apply(null, xs);
    };

    trialData.stdDev = function (xs) {
        if (!xs) xs = this.times;
        var mean = this.mean(xs);
        var squareError = function (acc, x) { return acc + Math.pow(x - mean, 2); };
        return Math.sqrt(xs.reduce(squareError) / xs.length)
    };

    trialData.topTenPercent = function (xs) {
        if (!xs) xs = this.times;
        return xs.slice(0).sort().slice(0, Math.round(xs.length / 10))
    };

    trialData.bottomTenPercent = function (xs) {
        if (!xs) xs = this.times;
        return xs.slice(0).sort().slice(Math.round(xs.length / 10))
    };

    return trialData;
});
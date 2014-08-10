angular.module('pvtApp').factory('trialData', function () {
    var trialData = {
        'times': []
    };

    var numCmp = function (x,y) { return x - y; };

    trialData.mean = function (xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return NaN; }
        return xs.reduce(function (sum,x) {return sum + x}, 0) / xs.length;
    };

    trialData.median = function (xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return NaN; }
        var len = xs.length;
        if (len % 2 == 0) {
            return this.mean(xs.slice((len / 2) - 1, (len / 2) + 1));
        }
        else {
            return xs[Math.floor(len / 2)];
        }
    };

    trialData.max = function (xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return NaN; }
        return Math.max.apply(null, xs);
    };

    trialData.min = function (xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return NaN; }
        return Math.min.apply(null, xs);
    };

    trialData.stdDev = function (xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return NaN; }
        var mean = this.mean(xs);
        var squareError = function (acc, x) { return acc + Math.pow(x - mean, 2); };
        return Math.sqrt(xs.reduce(squareError) / xs.length)
    };

    trialData.topTenPercent = function (xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return []; }
        return xs.slice(0).sort(numCmp).slice(xs.length - xs.length / 10)
    };

    trialData.bottomTenPercent = function (xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return []; }
        return xs.slice(0).sort(numCmp).slice(0, Math.round(xs.length / 10))
    };

    trialData.findLapses = function (threshold, xs) {
        if (!xs) xs = this.times;
        if (xs.length === 0) { return []; }
        return xs.filter(function (x) { return x >= threshold; });
    };

    return trialData;
});
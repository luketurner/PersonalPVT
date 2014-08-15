angular.module('pvtApp').factory('analyzeData', function () {
    var numCmp = function (x,y) { return x - y; };

    var mean = function (xs) {
        if (xs.length === 0) { return NaN; }
        return xs.reduce(function (sum,x) {return sum + x}, 0) / xs.length;
    };

    var median = function (xs) {
        if (xs.length === 0) { return NaN; }
        var len = xs.length;
        if (len % 2 == 0) {
            return mean(xs.slice((len / 2) - 1, (len / 2) + 1));
        }
        else {
            return xs[Math.floor(len / 2)];
        }
    };

    var max = function (xs) {
        if (xs.length === 0) { return NaN; }
        return Math.max.apply(null, xs);
    };

    var min = function (xs) {
        if (xs.length === 0) { return NaN; }
        return Math.min.apply(null, xs);
    };

    var stdDev = function (xs) {
        if (xs.length === 0) { return NaN; }
        var mean = mean(xs);
        var squareError = function (acc, x) { return acc + Math.pow(x - mean, 2); };
        return Math.sqrt(xs.reduce(squareError) / xs.length)
    };

    var topTenPercent = function (xs) {
        if (xs.length === 0) { return []; }
        return xs.slice(0).sort(numCmp).slice(xs.length - xs.length / 10)
    };

    var bottomTenPercent = function (xs) {
        if (xs.length === 0) { return []; }
        return xs.slice(0).sort(numCmp).slice(0, Math.round(xs.length / 10))
    };

    var lapses = function (xs, threshold) {
        if (xs.length === 0) { return []; }
        return xs.filter(function (x) { return x >= threshold; });
    };

    return function (xs) {
        var result = { list: xs };

        result.mean = function () {
            return mean(result.list);
        };

        result.median = function () {
            return median(result.list);
        };

        result.max = function () {
            return max(result.list);
        };

        result.min = function () {
            return min(result.list);
        };

        result.topTenPercent = function () {
            return topTenPercent(result.list);
        };

        result.bottomTenPercent = function () {
            return bottomTenPercent(result.list);
        };

        result.lapses = function (threshold) {
            return lapses(result.list, threshold);
        };

        return result;
    };
});
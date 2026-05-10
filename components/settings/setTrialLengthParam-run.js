// Lets shared links preconfigure the trial length via ?setTrialLength=<seconds>.
// The value is applied to settings once on startup, then stripped from the URL
// with replace() so the param does not stick around in history.
angular.module("pvtApp").run(function ($location, settings) {
    var raw = $location.search().setTrialLength;
    if (raw === undefined) { return; }

    var value = parseInt(raw, 10);
    if (!isNaN(value) && value > 0) {
        settings.trial_length = value;
    }

    $location.search('setTrialLength', null).replace();
});

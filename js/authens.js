var pvtServices = angular.module('pvtServices');

pvtServices.factory('authens', function () {
    var authens = {};

    // Tries to create an account.
    // Returns a promise that is resolved if the creation was successful, and rejected otherwise.
    authens.createAccount = function (user, pass) {
        var resp = $.Deferred();
        if (user === "test" || user === "") { // pretend this is DB access code
            resp.reject();
        } else {
            resp.resolve();
        }

        return resp.promise();
    };

    // Tries to login with given credentials.
    // Returns a promise that is resolved if login was successful, and rejected otherwise
    authens.login = function (user, pass) {
        var resp = $.Deferred();
        if (user === "" || pass === "") {
            resp.reject();
        }
        if (user === pass) { // dummy logic
            resp.resolve();
        } else {
            resp.reject();
        }

        return resp.promise();
    };

    return authens;
});
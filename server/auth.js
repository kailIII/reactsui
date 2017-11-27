"use strict";

var db = require('./db');
const basicAuth = require('express-basic-auth');
const btoa = require('btoa');

function myAuthorizer(username, password) {
    var user = db.findByLogin(username, password);
    if (!user) {
        return false;
    }

    // Update user token
    user.auth_token = btoa(username+':'+password);
    db.store(username, user);
    return true;
}

//Uses a JSON response body
var jsonAuth = basicAuth({
    authorizer: myAuthorizer,
    //authorizeAsync: true,
    unauthorizedResponse: { success: false }
});

module.exports = jsonAuth;

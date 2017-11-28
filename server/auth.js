"use strict";

// Load dependencies
var db = require('./db');
const basicAuth = require('express-basic-auth');
const btoa = require('btoa');
const UsersModel = require('./models/users');
var Users = new UsersModel(db);

/**
 * Validate authentication
 * @param  {String}   username The username
 * @param  {String}   password The password
 * @param  {Function} cb       The async callback
 */
function myAuthorizer(username, password, cb) {
    console.log('Request by ' + username);
    Users.findByLogin(username, password, (user) => {
        if (!user) {
            return cb(null, false);
        }

        // Update user token
        user.auth_token = btoa(username+':'+password);
        Users.store(user, (user) => {
            return cb(null, true);
        });
    });
}

/**
 * Use a JSON response
 * @type {Function}
 */
var jsonAuth = basicAuth({
    authorizer: myAuthorizer,
    authorizeAsync: true,
    unauthorizedResponse: { success: false }
});

module.exports = jsonAuth;

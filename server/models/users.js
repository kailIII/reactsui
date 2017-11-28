"use strict";

const objection = require('objection');
const Model = objection.Model;
const md5 = require('md5'); // TODO: use another crypto library
const btoa = require('btoa');

// Define user model
class User extends Model {
    static get tableName() {
        return 'users';
    }
    static dispense(data) {
        return {
            email: user.email,
            pwd: md5(user.pwd)
        };
    }
}

/**
 * Create user model interface
 * @return {Function} The database interface
 */
var Users = function (db) {

    // Give the connection to objection.
    Model.knex(db);

    /**
     * Find user by email
     * @param  {String}   email The user email
     * @param  {Function} cb    The async callback
     */
    function findByEmail(email, cb) {
        User.query()
        .where('email', email)
        .then(users => {
            cb(users.length ? users[0] : false);
        });
    }

    /**
     * Find user by email and password
     * @param  {String}   email The user email
     * @param  {String}   pwd   The user password
     * @param  {Function} cb    The async callback
     */
    function findByLogin(email, pwd, cb) {
        User.query()
        .where('email', email)
        .where('pwd', md5(pwd))
        .then(users => {
            cb(users.length ? users[0] : false);
        });
    }

    /**
     * Find user by auth token
     * @param  {String}   token The auth token
     * @param  {Function} cb    The async callback
     */
    function findByToken(token, cb) {
        User.query()
        .where('auth_token', token)
        .then(users => {
            cb(users.length ? users[0] : false);
        });
    }

    /**
     * Insert user
     * @param  {Object}   data The user to insert
     * @param  {Function} cb   [description]
     * @return {[type]}        [description]
     */
    function insertUser(data, cb) {
        User.query().insert(data)
        .then(() => {
            cb(data);
        });
    }

    /**
     * Update user with data
     * @param  {Number}   id   The user id
     * @param  {Object}   data The data to update
     * @param  {Function} cb   The async callback
     */
    function updateUser(id, data, cb) {
        User.query()
        .patchAndFetchById(id, data)
        .then(cb);
    }

    /**
     * Store user
     * @param  {Object}   user The user to be stored
     * @param  {Function} cb   The async callback
     */
    function store(user, cb) {
        User.query()
        .where('id', user.id)
        .then(users => {
            if (users.length === 0) {
                user = User.dispense(user);
                insertUser(user, cb);
            } else {
                updateUser(user.id, user, cb);
            }
        });
    }

    /**
     * The database API
     * @type {Object}
     */
    return {
        findByEmail: findByEmail,
        findByLogin: findByLogin,
        findByToken: findByToken,
        store: store
    }
}

module.exports = Users;

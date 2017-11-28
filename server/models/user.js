"use strict";

const objection = require('objection');
const Model = objection.Model;
const md5 = require('md5'); // TODO: use another crypto library
const btoa = require('btoa');

// Define user model
class User extends Model {

    /**
     * Get model tablename
     * @type {String}
     */
    static get tableName() {
        return 'users';
    }

    /**
     * Define user model attributes validation
     * @type {Object}
     */
    static get jsonSchema () {
        return {
            type: 'object',
            required: ['email', 'pwd'],

            properties: {
                id: {type: 'integer'},
                email: {type: 'string', minLength: 1, maxLength: 80},
                pwd: {type: 'string', minLength: 1},
                auth_token: {type: 'string'},
                active: {type: 'boolean'}
            }
        }
    }

    /**
     * Dispense new user object from data
     * @param  {Object} data The user data
     * @return {Object}      The new user
     */
    static dispense(data) {
        return {
            email: data.email,
            pwd: md5(data.pwd)
        };
    }

    /**
     * Find user by email
     * @param  {String}   email The user email
     * @param  {Function} cb    The async callback
     */
    static findByEmail(email, cb) {
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
    static findByLogin(email, pwd, cb) {
        User.query()
        .where('email', email)
        .where('pwd', md5(pwd))
        .where('active', true)
        .then(users => {
            cb(users.length ? users[0] : false);
        });
    }

    /**
     * Find user by auth token
     * @param  {String}   token The auth token
     * @param  {Function} cb    The async callback
     */
    static findByToken(token, cb) {
        User.query()
        .where('auth_token', token)
        .then(users => {
            cb(users.length ? users[0] : false);
        });
    }

    /**
     * Store user
     * @param  {Object}   user The user to be stored
     * @param  {Function} cb   The async callback
     */
    static store(user, cb) {
        User.query()
        .where('id', user.id || null)
        .then(users => {
            if (users.length === 0) {
                user = User.dispense(user);
                User.query()
                .insert(user)
                .then(cb);
            } else {
                User.query()
                .patchAndFetchById(user.id, user)
                .then(cb);
            }
        });
    }
}

module.exports = User;

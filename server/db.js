'use strict';

var md5 = require('md5');
var store = require('data-store')('database', {cwd: 'data'});

var DB = function () {

    function sk(key) {
        return key ? key.replace(/\./g, '-') : 'xxx';
    }

    function authByLogin(email, pwd) {
        var email = sk(email);
        if (store.has(email)) {
            var user = store.get(email);
            if (md5(pwd) === user.pwd) {
                user.auth_token = md5(email+':'+pwd);
                store.set(email, user);
                return user;
            }
        }
        return false;
    }

    function authByToken(token) {
        var users = store.get();
        for (var key in store.get()) {
            if (store.get(key).auth_token === token) {
                return store.get(key);
            }
        }
        return false;
    }

    if (!store.has(sk('admin@isp.com'))) {
        store.set(sk('admin@isp.com'), {
            pwd: md5('admin')
        });
    }
    if (!store.has(sk('other@isp.com'))) {
        store.set(sk('other@isp.com'), {
            pwd: md5('other')
        });
    }
    store.save();

    return {
        authByLogin: authByLogin,
        authByToken: authByToken
    }
}

module.exports = new DB();

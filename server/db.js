"use strict";

var md5 = require('md5'); // TODO: use another crypto library
const btoa = require('btoa');
var store = require('data-store')('database', {cwd: 'data'});

var DB = function () {

    function asKey(key) {
        return key ? key.replace(/\./g, '-') : 'xxx';
    }

    function findByLogin(email, pwd) {
        var key = asKey(email);
        if (store.has(key)) {
            var user = store.get(key);
            if (md5(pwd) === user.pwd) {
                return user;
            }
        }
        return false;
    }

    function findByToken(token) {
        var users, item = store.get();
        for (var key in store.get()) {
            item = store.get(key);
            if (item.auth_token === token) {
                return item;
            }
        }
        return false;
    }

    function storeItem(key, data) {
        store.set(asKey(key), data);
    }

    if (!store.has(asKey('admin@isp.com'))) {
        store.set(asKey('admin@isp.com'), {
            email: 'admin@isp.com',
            pwd: md5('admin')
        });
    }
    if (!store.has(asKey('other@isp.com'))) {
        store.set(asKey('other@isp.com'), {
            email: 'other@isp.com',
            pwd: md5('other')
        });
    }
    store.save();

    return {
        asKey: asKey,
        findByLogin: findByLogin,
        findByToken: findByToken,
        store: storeItem
    }
}

module.exports = new DB();

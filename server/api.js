'use strict';

var db = require('./db');

var API = function (app) {

    app.post('/login', function (req, res, next) {
        var user = db.authByLogin(req.body.email, req.body.pwd);
        return user ? res.send({success: true, auth_token: user.auth_token})
            : res.send({'success': false});
    });

    app.get('/user', function (req, res) {
        var user = db.authByToken(req.headers['x-authorization']);
        user ? res.send({success: true, user: user})
            : res.send({success: false})
    });

    app.get('/', function (req, res) {
        res.send('Server')
    });
}

module.exports = API;

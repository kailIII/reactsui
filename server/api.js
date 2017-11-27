"use strict";

var db = require('./db');
const authMiddleware = require('./auth'); // Uses basic HTTP Auth

var API = function (app) {

    app.get('/login', authMiddleware, function (req, res, next) {
        res.status(200).send({success: true});
    });

    app.get('/user', authMiddleware, function (req, res) {
        var token = req.headers['authorization'].replace('Basic ', '');
        var user = db.findByToken(token);
        res.status(200).send({success: true, user: user});
    });

    app.get('/', function (req, res) {
        res.send('Server')
    });
}

module.exports = API;

"use strict";

const db = require('./db');
const UsersModel = require('./models/users');
const authMiddleware = require('./auth'); // Uses basic HTTP Auth
var Users = new UsersModel(db);

var API = function (app) {

    app.get('/login', authMiddleware, function (req, res, next) {
        console.log('Login OK');
        res.status(200).send({success: true});
    });

    app.get('/user', authMiddleware, function (req, res) {
        console.log('Request user record');
        var token = req.headers['authorization'].replace('Basic ', '');
        Users.findByToken(token, (user) => {
            console.log('User record OK');
            res.status(200).send({success: true, user: user});
        });
    });

    app.get('/', function (req, res) {
        res.send('Server')
    });
}

module.exports = API;

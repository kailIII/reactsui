"use strict";

const db = require('./db');
const User = require('./models/user');
const Todo = require('./models/todo');
const authMiddleware = require('./auth'); // Uses basic HTTP Auth

var API = function (app) {

    app.get('/login', authMiddleware, function (req, res, next) {
        console.log('Login OK');
        res.status(200).send({success: true});
    });

    app.get('/user', authMiddleware, function (req, res) {
        console.log('Request user record');
        var token = req.headers['authorization'].replace('Basic ', '');
        User.findByToken(token, (user) => {
            console.log('User record OK');
            res.status(200).send({success: true, user: user});
        });
    });

    app.get('/todo', function (req, res) {
        console.log('Request todos records');
        Todo.findAll((items) => {
            console.log('Todos records OK');
            res.status(200).send({success: true, items: items});
        });
    });

    app.post('/todo', function (req, res) {
        console.log('POST todo record', req.body);
        var todo = req.body;
        Todo.store(todo, (err, todo) => {
            console.log('Store todo record OK');
            err ? res.status(200).send({success: false, errors: err})
                : res.status(200).send({success: true, todo: todo});
        });
    });

    app.delete('/todo/complete', function (req, res) {
        console.log('Request clear complete todos');
        Todo.clearComplete(() => {
            console.log('Clear complete todos OK');
            res.status(200).send({success: true});
        });
    });

    app.delete('/todo/:id', function (req, res) {
        console.log('Request removo todo record');
        Todo.removeById(req.params.id, () => {
            console.log('Remove todo record OK');
            res.status(200).send({success: true});
        });
    });

    app.get('/', function (req, res) {
        res.send('Server')
    });
}

module.exports = API;

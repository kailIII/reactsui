var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var API = require('./api');

var server = express();
server.use(cors());
server.use(bodyParser.json());

server.use(session({
    secret: 'reactsui',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

const port = 8089;
server.listen(port, function () {
    console.log('Listening: '+port);
});

var api = new API(server);

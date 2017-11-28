'use strict';

// Require dependencies
var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var API = require('./api');

// Get server configuration
var config = require('./config.json');

// Create HTTP server
var server = express();
server.use(cors());
server.use(bodyParser.json());

// Use HTTP sessions
server.use(session({
    secret: 'reactsui',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

// Start server
server.listen(config.port, function () {
    console.log('Listening: '+config.port);
});

// Load API
var api = new API(server);

"use strict";

const md5 = require('md5'); // TODO: use another crypto library
const db = require('./db');

// Load models
const UsersModel = require('./models/users');
var Users = new UsersModel(db);

// Create users table if not exists
const schemaPromise = db.schema.createTableIfNotExists('users', table => {
    table.increments('id').primary();
    table.string('email');
    table.string('pwd');
    table.string('auth_token');
});

// Migrate data if not exists
schemaPromise.then(() => {

    // Seed users
    Users.findByEmail('admin@isp.com', (result) => {
        if (!result) {
            return Users.store({email: 'admin@isp.com', pwd: md5('admin')});
        }
    });

});

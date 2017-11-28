"use strict";

const md5 = require('md5'); // TODO: use another crypto library
const db = require('./db');

// Load models
const User = require('./models/user');

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
    User.findByEmail('admin@isp.com', (result) => {
        if (!result) {
            return User.store({email: 'admin@isp.com', pwd: 'admin'});
        }
    });

});

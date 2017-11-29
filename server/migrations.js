"use strict";

const md5 = require('md5'); // TODO: use another crypto library
const db = require('./db');

// Load models
const User = require('./models/user');

// Create users table if not exists
const usersTablePromise = db.schema.createTableIfNotExists('users', table => {
    table.increments('id').primary();
    table.string('email');
    table.string('pwd');
    table.string('auth_token');
});

// Migrate data if not exists
usersTablePromise.then(() => {

    // Seed users
    User.findByEmail('admin@isp.com', (result) => {
        if (!result) {
            return User.store({email: 'admin@isp.com', pwd: 'admin'});
        }
    });

});

// Run migrations
db.schema.table('users', function (table) {
    table.boolean('active').defaultTo(true);
}).then((err, result) => {
    console.log(result);
}).catch((err) => {
    console.log('error', err);
});

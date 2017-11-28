"use strict";

// Using Objection ORM improved interoperability
const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');

// Initialize database connection.
const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/database.sqlite3'
    }
});

// Give the connection to objection.
Model.knex(knex);

// Export knex
module.exports = knex;

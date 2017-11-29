"use strict";

// Using Objection ORM improved interoperability
const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');

// Get configuration
var config = require('./config.json');

// Initialize database connection.
const knex = Knex(config.db);

// Give the connection to objection.
Model.knex(knex);

// Export knex
module.exports = knex;

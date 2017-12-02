"use strict";

const objection = require('objection');
const Model = objection.Model;
const md5 = require('md5'); // TODO: use another crypto library
const btoa = require('btoa');

// Define todo model
class Todo extends Model {

    /**
     * Get model tablename
     * @type {String}
     */
    static get tableName() {
        return 'todos';
    }

    /**
     * Define model attributes validation
     * @type {Object}
     */
    static get jsonSchema () {
        return {
            type: 'object',
            required: ['description'],

            properties: {
                id: {type: 'integer'},
                description: {type: 'string', minLength: 1, maxLength: 80},
                complete: {type: 'boolean'}
            }
        }
    }

    /**
     * Dispense new object from data
     * @param  {Object} data The todo data
     * @return {Object}      The new todo
     */
    static dispense(data) {
        return {
            description: data.description,
            complete: data.complete || false
        };
    }

    /**
     * Find all
     * @param  {Function} cb    The async callback
     */
    static findAll(cb) {
        Todo.query()
        .then(cb);
    }

    /**
     * Find complete
     * @param  {Function} cb    The async callback
     */
    static findComplete() {
        Todo.query()
        .where('complete', true)
        .then(cb);
    }

    /**
     * Remove todo
     * @param  {Function} cb    The async callback
     */
    static removeById(id, cb) {
        Todo.query()
        .delete()
        .where('id', id)
        .then(cb);
    }

    /**
     * Store todo
     * @param  {Object}   todo The todo to be stored
     * @param  {Function} cb   The async callback
     */
    static store(todo, cb) {
        Todo.query()
        .where('id', todo.id || null)
        .then(items => {
            if (items.length === 0) {
                todo = Todo.dispense(todo);
                Todo.query()
                .insert(todo)
                .then(cb);
            } else {
                Todo.query()
                .patchAndFetchById(todo.id, todo)
                .then(cb);
            }
        });
    }
}

module.exports = Todo;

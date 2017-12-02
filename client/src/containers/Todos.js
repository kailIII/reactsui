import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
import TodosComponent from '../components/Todos';
import TodosLoaderComponent from '../components/TodosLoader';
import {
    todosFindAll,
    todosFormDescription,
    todosFormComplete,
    todosSetFilter,
    todosItemRemove,
    todosSubmit
} from '../actions.js';

class Todos extends Component {
    constructor(props) {
        super(props);
        this.handleFormDescription = this.handleFormDescription.bind(this);
        this.handleFormComplete = this.handleFormComplete.bind(this);
        this.editTodoItem = this.editTodoItem.bind(this);
        this.newTodoItem = this.newTodoItem.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.removeTodoItem = this.removeTodoItem.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        todosFindAll();
    }

    handleFormDescription(e, { name, value }) {
        todosFormDescription(value);
    }

    handleFormComplete() {
        todosFormComplete(!Store.get('todos.form.complete'));
    }

    editTodoItem(todo) {
        Store.update('todos', {form: todo});
    }

    removeTodoItem(todo) {
        todosItemRemove(todo, () => {
            console.log('Todo removed');
        });
    }

    newTodoItem() {
        var todo = {id:null, description:'', complete: false};
        this.editTodoItem(todo);
    }

    setFilter(filter) {
        todosSetFilter(filter);
    }

    submit(e) {
        e.preventDefault();
        var todo = Store.get('todos.form');
        todosSubmit(todo, (result) => {
            console.log('saved', result);
        });
    }

    render() {
        if (this.props.loading) return <TodosLoaderComponent />
        return (
            <TodosComponent {...this.props}
                handleFormDescription={this.handleFormDescription}
                handleFormComplete={this.handleFormComplete}
                editTodoItem={this.editTodoItem}
                newTodoItem={this.newTodoItem}
                setFilter={this.setFilter}
                removeTodoItem={this.removeTodoItem}
                submit={this.submit}
            />
        );
    }
}

export default withStore('todos', Todos);

import React, { Component } from 'react';
import { withStore } from 'react-observable-store';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import UserComponent from './components/User';
import { profileGetUser } from './actions.js';

class User extends Component {

    componentWillMount() {
        profileGetUser(this.props.cookies.get('auth_token'));
    }

    render() {
        if (!this.props.cookies.get('auth_token')) {
            return <Redirect to="/login" />
        }
        return (
            <UserComponent {...this.props} />
        )
    }
}

export default withStore('profile', withCookies(User));

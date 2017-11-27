import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    render() {
        this.props.cookies.remove('auth_token');
        return <Redirect to="/" />
    }
}

export default withCookies(Logout);

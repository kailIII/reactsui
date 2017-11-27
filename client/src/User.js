import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.getUser = this.getUser.bind(this);
    }

    componentWillMount() {
        this.getUser();
    }

    getUser() {
        fetch('http://localhost:8080/user', {
            headers: {
                'Accept': 'application/json, */*',
                'Content-Type': 'application/json',
                'x-authorization': this.props.cookies.get('auth_token')
            }
        })
        .then((res) => {console.log(res); return res.json()})
        .then((data) => {
            console.log(data);
            if (data.success) {
                this.setState({user: data.user});
            }
        });
    }

    logout() {
        this.props.cookies.remove('auth_token');
    }

    render() {
        if (!this.props.cookies.get('auth_token')) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <pre>{JSON.stringify(this.state.user)}</pre>
            </div>
        )
    }
}

export default withCookies(User);

import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            email: '',
            pwd: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
    }

    submit(e) {
        e.preventDefault();
        var auth_token = btoa(this.state.email+':'+this.state.pwd);

        fetch('http://localhost:8089/login', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + auth_token
            }
        })
        .then(res => res.json())
        .then((data) => {
            if (data.success) {
                this.props.cookies.set('auth_token', auth_token);
                this.props.history.push('/');
            } else {
                this.setState({error: true});
            }
        });
    }

    render() {
        if (this.props.cookies.get('auth_token')) {
            return <Redirect to="/user" />
        }
        return (
            <div className="ui main text container">
                <h1 className="ui header">Login</h1>

                <Form error={this.state.error} onSubmit={this.submit}>
                    <Form.Field required>
                        <label>E-mail</label>
                        <Form.Input name="email" placeholder='E-mail' onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <Form.Input name="pwd" type="password" placeholder='Password' onChange={this.handleChange}/>
                    </Form.Field>
                    <Message error
                        header='Error'
                        content='E-mail or password is wrong'
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default withCookies(Login);

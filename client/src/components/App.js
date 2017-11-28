import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import TopMenu from './TopMenu';
import Home from './Home';
import Home2 from './Home2';
import Logout from './Logout';
import Footer from './Footer';
import Login from '../containers/Login';
import User from '../containers/User';
import '../assets/App.css';

class App extends Component {
    render() {
        return (
            <div>
                <TopMenu />

                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/home2" component={Home2} />
                <Route path="/login" component={Login} />
                <Route path="/user" component={User} />
                <Route path="/logout" component={Logout} />

                <Footer />

            </div>
        );
    }
}

export default withCookies(App);

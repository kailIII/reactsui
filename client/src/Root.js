import React, { Component } from 'react';
import App from './App.js';
import { HashRouter as Router } from 'react-router-dom';

class Root extends Component {
    render() {
        return (
            <Router>
                <App />
            </Router>
        );
    }
}

export default Root;

import React from 'react';
import ReactDOM from 'react-dom';
import Store from 'react-observable-store';
import './semantic/dist/semantic.min.css';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';

// Init global state
Store.init({
    login: {
        error: false,
        email: '',
        pwd: ''
    },
    profile: {
        user: {}
    }
});

// Render app
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Router>
          <CookiesProvider>
              <App />
          </CookiesProvider>
      </Router>
      , div);
});

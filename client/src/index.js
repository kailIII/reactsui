import React from 'react';
import ReactDOM from 'react-dom';
import './semantic/dist/semantic.min.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

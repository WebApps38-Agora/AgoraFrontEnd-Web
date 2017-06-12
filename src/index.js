import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router forceRefresh={false}>
    <App />
  </Router>,
  document.getElementById('root'));
registerServiceWorker();

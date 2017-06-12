import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from './configureStore'

import App from './App';

let store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();

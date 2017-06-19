import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux'
import configureStore from './configureStore'

import App from './App';

let store = configureStore()

const Root = ({ store }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'));
registerServiceWorker();

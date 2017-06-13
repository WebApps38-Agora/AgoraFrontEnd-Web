import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from './configureStore'

import { fetchTopics } from './actions/TopicIndex'
import App from './App';

let store = configureStore()
//store.dispatch(fetchTopics())

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'));
registerServiceWorker();

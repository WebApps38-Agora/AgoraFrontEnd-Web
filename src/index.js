import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App';
import AppHeader from './AppHeader';
import Feedback from './Feedback';
import SummaryLayout from './SummaryLayout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router forceRefresh={false}>
    <div>
        <AppHeader />
        <Route exact path="/" component={App}/>
        <Route path="/summary/:id" component={SummaryLayout}/>
    </div>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();

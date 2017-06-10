import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './App';
import SummaryLayout from './SummaryLayout';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Router forceRefresh={false}>
    <div>
        <Route exact path="/" component={App}/>
        <Route path="/summary" component={SummaryLayout}/>
    </div>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();

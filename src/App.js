import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppHeader from './AppHeader';
import Feedback from './Feedback';
import LandingGrid from './LandingGrid';
import SummaryLayout from './SummaryLayout';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_color: ""
    }
  }

  render() {
    return (<div>
      <AppHeader />
      <Switch className="app-shell">
        <Route exact path="/" component={LandingGrid}/>
        <Route path="/summary/:id" component={SummaryLayout}/>
      </Switch>
    </div>);
  }
}

export default App;

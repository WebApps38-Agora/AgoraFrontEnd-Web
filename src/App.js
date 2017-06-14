import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from './components/AppHeader';
import TopicIndex from './components/TopicIndex';
import TopicPage from './components/TopicPage';
import LoginPage from './components/LoginPage';

import 'semantic-ui-css/semantic.min.css';
import './style/App.css';

class App extends Component {
  render() {
    let props = this.state;
    return (<main>
      <AppHeader />
      <div className="app-wrapper">
        <Route exact path="/" render={()=> <TopicIndex {...props}/>}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/topic/:id" component={TopicPage}/>
      </div>
    </main>);
  }
}

export default connect()(App);

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from './components/AppHeader';
import TopicIndex from './components/TopicIndex';
import TopicPage from './components/TopicPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import MapApp from './map/MapApp';

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
        <Route path="/profile" component={ProfilePage}/>
        <Route exact path="/topic/:id" component={TopicPage}/>
        <Route path="/topic/stats/map" component={MapApp} />
      </div>
    </main>);
  }
}

export default connect()(App);

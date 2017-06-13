import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './presentational/AppHeader';
// import Feedback from './Feedback';
import TopicIndex from './containers/TopicIndex';
import TopicPage from './containers/TopicPage';
import LoginPage from './presentational/LoginPage';
import 'semantic-ui-css/semantic.min.css';
import './style/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_color: "",
      topics: []
    };
  }

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

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
// import Feedback from './Feedback';
import TopicIndex from './TopicIndex';
import TopicPage from './TopicPage';
import LoginPage from './LoginPage';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_color: "",
      topics: [],
      isLoaded: false};
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.loadTopics();
  }

  loadTopics = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/topics').then(function(response) {
      return response.json();
    }).then(function(j) {
      component.setState({topics: j.results, isLoaded: true});

    });
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

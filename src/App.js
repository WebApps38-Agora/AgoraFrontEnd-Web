import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppHeader from './AppHeader';
// import Feedback from './Feedback';
import TopicIndex from './TopicIndex';
import TopicPage from './TopicPage';
import LoginPage from './LoginPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      main_color: "",
      topics: [],
      isLoaded: false};
  }

  componentWillMount() {
    console.log("Bouta mount");
    console.log(this.state);
  }

  componentDidMount() {
    console.log("Loading sources");
    console.log(this.state);
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
    return (<div>
      <AppHeader />
      <div>
        <Route exact path="/" render={()=> <TopicIndex {...props}/>}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/topic/:id" component={TopicPage}/>
      </div>
    </div>);
  }
}

export default App;

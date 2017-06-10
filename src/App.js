import injectTapEventPlugin from '../node_modules/react-tap-event-plugin';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginControl from './LoginControl';
import Comments from './Comments';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Polynews</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <LoginControl />
          <Comments />
        </div>
     </MuiThemeProvider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkBlack } from 'material-ui/styles/colors';
import logo from './logo.svg';
import './App.css';
import LoginControl from './LoginControl';
import LandingGrid from './LandingGrid';
import Comments from './Comments';

// Needed for onTouchTap
injectTapEventPlugin();

// Overrides default material-ui theme
const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
  },
  appBar: {
    height: 50,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
          <LandingGrid />
        </div>
     </MuiThemeProvider>
    );
  }
}

export default App;


import React, { Component } from 'react';
import { Image, Loader, Dimmer, Segment } from 'semantic-ui-react'

class LoginPage extends Component {

  render() {
    return <h1>login</h1>;
  }
}

export default LoginPage;

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1> "Welcome Back" </h1>;
  }
  return <h1> "Please sign in" </h1>;
}

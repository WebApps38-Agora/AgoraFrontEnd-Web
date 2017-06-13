import React, { Component} from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Icon, Form, Message } from 'semantic-ui-react'
import FacebookProvider, { Login } from 'react-facebook';

export default class LoginPage extends Component {
  handleResponse = (data) => {
    console.log(data);
  }

  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    return (
      <div style={{ marginTop: 6 + "rem", padding: "0 1rem" }}>
        <Segment padded>
          <Form success={false}>
            <Message
              header='Login'
            />
            <Form.Input label='Email' placeholder='agora@gmail.com' />
            <Form.Input label='Password' placeholder='Password' type='Password' />
            <Message
              success
              header='Form Completed'
              content="You're all signed up for the newsletter"
            />
            <Message
              error
              header='Oh no!'
              content="There seems to be an error with that email."
            />
            <Button>Submit</Button>
          </Form>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid>Sign Up Now</Button>
          <Divider horizontal>Or</Divider>
          <FacebookProvider appId="123456789">
            <Login
              scope="email"
              onResponse={this.handleResponse}
              onError={this.handleError}
            >
              <Button color='facebook' fluid><Icon name='facebook' />Login via Facebook</Button>
            </Login>
          </FacebookProvider>
        </Segment>
      </div>
    );
  }
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1> "Welcome Back" </h1>;
  }
  return <h1> "Please sign in" </h1>;
}

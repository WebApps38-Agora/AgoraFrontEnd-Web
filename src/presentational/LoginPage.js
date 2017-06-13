import React, { Component} from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Icon, Form, Message } from 'semantic-ui-react'
import FacebookProvider, { Login } from 'react-facebook';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  handleResponse = (data) => {
    console.log(data);
    this.setState({
      first_name: data.profile.first_name,
      gender: data.profile.gender,
      id: data.profile.id,
      last_name: data.profile.last_name,
      link: data.profile.link,
      locale: data.profile.locale,
      name: data.profile.name,
      timezone: data.profile.timezone,
      verified: data.profile.verified ,
      accessToken: data.tokenDetail.accessToken,
      expiresIn: data.tokenDetail.expiresIn,
      signedRequest: data.tokenDetail.signedRequest,
      isLoggedIn: true
    })

    fetch('http://graph.facebook.com/'+data.profile.id+'/picture')
  	.then(function(response) {
  	  return response.blob();
  	})
  	.then(function(imageBlob) {
  	  document.querySelector('img').src = URL.createObjectURL(imageBlob);
  	});

    //get key
    fetch('http://localhost:8000/rest_auth/facebook/', {method: 'post', mode: 'cors',
    	redirect: 'follow',
    	headers: new Headers({
    		'content-type': 'application/json'
    	}), body: JSON.stringify({
    		access_token: this.state.accessToken
    	})}).then( (r)=> r.json())
          .then( (j) => {
        console.log(j)
      })
    }

  handleError = (error) => {
    console.log(error)
    this.setState({ error });
  }

  render() {
    return (
      <div style={{ marginTop: 6 + "rem", padding: "0 1rem" }}>
        <Message
              success
              header={'Welcome '}
              content="You're all signed in!"
            />
        <Segment padded>
          <FacebookProvider appId="1959921887623211">
            <Login
              scope="email"
              onResponse={this.handleResponse}
              onError={this.handleError}
            >
              <Button color='facebook' fluid><Icon name='facebook' />Login via Facebook</Button>
            </Login>
          </FacebookProvider>
          <Divider horizontal>Or</Divider>
          <Form success={false}>
            <Message
              header='Login'
            />
            <Form.Input label='Email' placeholder='agora@gmail.com' />
            <Form.Input label='Password' placeholder='Password' type='Password' />
            <Message
              error
              header='Oh no!'
              content="There seems to be an error with that email."
            />
            <Button>Submit</Button>
          </Form>
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

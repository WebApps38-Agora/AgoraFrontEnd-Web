import React, { Component} from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Icon, Form, Message } from 'semantic-ui-react'
import FacebookProvider, { Login } from 'react-facebook';
import { sendLogin } from '../actions/TopicIndex'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import Globals from '../globals'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    Cookies.set('name', 'value', {expires : 365})
    console.log(Cookies.get('name'))
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

    fetch('https://graph.facebook.com/' + data.profile.id + '/picture')
  	.then(function(response) {
  	  return response.blob();
  	})
  	.then(function(imageBlob) {
      var loginLogo = document.getElementById('login-logo');
      var profileLogo = document.getElementById('profile-logo');
      loginLogo.style.display = 'none';
      profileLogo.querySelector('img').src = URL.createObjectURL(imageBlob);
      profileLogo.style.display = 'block';
  	  // document.querySelector('img').src = URL.createObjectURL(imageBlob);
  	});

    this.props.dispatch(sendLogin(data.tokenDetail.accessToken))
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
          <FacebookProvider appId={Globals.FACEBOOK_APP_ID}>
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

export default connect()(LoginPage)

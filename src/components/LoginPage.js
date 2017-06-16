import React, { Component} from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Icon, Form, Message } from 'semantic-ui-react'
import FacebookProvider, { Login } from 'react-facebook';
import { sendLogin } from '../actions/RootActions'
import { fetchProfile, updateProfile } from '../actions/ProfileActions'
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

  }

  handleResponse = (data) => {

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
  	});


    this.props.dispatch(sendLogin(data.tokenDetail.accessToken))
    this.props.dispatch(updateProfile(data, this.props.myProfile.id))
    this.props.dispatch(fetchProfile())
  }


  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    return (
      <div className="app-shell" style={{display: "table", width: "100%", height: "100%"}}>
        <div style={{display: "table-cell", verticalAlign: "middle"}}>
          <Segment padded style={{maxWidth: 400 + "px", margin: "1rem auto", }}>
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
              <Form.Input label='Email' placeholder='agora@gmail.com' />
              <Form.Input label='Password' placeholder='Password' type='Password' />
              <Message
                error
                header='Oh no!'
                content="There seems to be an error with that email."
              />
              <Button primary style={{width: 100 + "%"}}>Submit</Button>
            </Form>
          </Segment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myProfile: state.myProfile,
  }
}

export default connect(mapStateToProps)(LoginPage)

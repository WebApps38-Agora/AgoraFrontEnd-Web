import React, { Component} from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Icon, Form, Message } from 'semantic-ui-react'
import FacebookProvider, { Login } from 'react-facebook';
import { sendLogin } from '../actions/TopicIndex'
import { connect } from 'react-redux'
import ProfilePage from './ProfilePage'
import Cookies from 'js-cookie'
import Globals from '../globals'

class LoginPage extends Component {
  constructor(props) {
    super(props);
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
    })

    let image = 'https://graph.facebook.com/'+data.profile.id+'/picture'

    this.props.dispatch(sendLogin(data.tokenDetail.accessToken,
                                  image
                                  ))
  }

  handleError = (error) => {
    console.log(error)
    this.setState({ error });
  }

  render() {
    return (
      <div className="app-shell">
        { this.props.loginKey &&
          <ProfilePage />
          }
        { !this.props.loginKey &&
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
      }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loginKey: state.loginKey
  }
}
export default connect(mapStateToProps)(LoginPage)

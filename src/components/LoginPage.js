import React, { Component} from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Icon, Form, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import FacebookProvider, { Login } from 'react-facebook';
import { sendLogin } from '../actions/RootActions'
import { removeProfileWarning } from '../actions/ProfileActions'
import { connect } from 'react-redux'
import ProfilePage from './ProfilePage'
import Globals from '../globals'

class LoginPage extends Component {
  componentWillUnmount = () => {
    this.props.dispatch(removeProfileWarning())
  }

  handleResponse = (data) => {
    this.props.dispatch(sendLogin(data))
  }

  handleError = (error) => {
    this.setState({ error });
  }

  render() {

    if (this.props.loginKey) {
      return <Redirect to='/profile' />
    }

    return (
      <div className="app-shell" style={{display: "table", width: "100%", height: "100%"}}>
        <div style={{display: "table-cell", verticalAlign: "middle"}}>

          { !this.props.loginKey &&
          <Segment padded style={{maxWidth: 400 + "px", margin: "1rem auto", }}>
            { this.props.profileWarnings && <Message warning header='You must login before you can visit your profile!' /> }
            { this.props.loginKey && <ProfilePage /> }
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
              <Form.Input placeholder='Email' />
              <Form.Input placeholder='Password' type='Password' />
              <Message
                error
                header='Oh no!'
                content="There seems to be an error with that email."
              />
              <Button style={{backgroundColor: "var(--app-snd-color)", color: "white", width: "100%"}}>Submit</Button>
            </Form>
          </Segment>
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loginKey: state.loginKey,
    profileWarnings: state.profileWarnings,
    myProfile: state.profiles[state.myProfile],
  }
}

export default connect(mapStateToProps)(LoginPage)

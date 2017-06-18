import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class AppHeader extends Component {
  render() {
    let profile_logo =
      <Menu.Item
         as={Link}
         id="login-logo"
         to='/login'
         icon="user outline"
         onClick={this.openLogin}
         position="right" />

    if (this.props.myProfile) {
      profile_logo =
        <Menu.Item
           as={Link}
           id="profile-logo"
           to='/profile'
           position="right">
          <Image src={this.props.myProfile.profile_picture} shape='circular' bordered/>
        </Menu.Item>
    }

    let notifications =
      <Menu.Item
         as={Link}
         id="login-logo"
         to='/login'
         icon="alarm outline"
         onClick={this.openLogin}
         position="right" />


    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted >
        <Menu.Item as={Link} to="/">
          <img src={require("../images/agora_logo.png")} alt="logo" />
        </Menu.Item>
        {notifications}
        {profile_logo}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginKey,
    myProfile: state.profiles[state.myProfile]
  }
}

export default connect(mapStateToProps)(AppHeader)

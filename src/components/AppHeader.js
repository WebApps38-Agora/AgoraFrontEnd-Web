import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import { filterByTag } from '../actions/TagActions'
import 'semantic-ui-css/semantic.min.css';

class AppHeader extends Component {

  constructor(props) {
    super(props)
    this.handleLogoClick = this.handleLogoClick.bind(this)
  }

  handleLogoClick() {
    this.props.dispatch(filterByTag(0))
  }

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
        <Menu.Item as={Link} to='/' onClick={this.handleLogoClick}>
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
    myProfile: state.profiles[state.myProfile],
    isTagged: state.tags.filterByTag || false
  }
}

export default connect(mapStateToProps)(AppHeader)

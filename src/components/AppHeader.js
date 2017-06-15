import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default class AppHeader extends Component {
  render() {
    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted>
        <Menu.Item as={Link} to="/">
          <img src={require("../images/agora_logo.png")} alt="logo" />
        </Menu.Item>
        <Menu.Item as={Link}
                   id="login-logo"
                   to='/login'
                   icon="user outline"
                   onClick={this.openLogin}
                   position="right" />
        <Menu.Item style={{display: 'none'}}
                   as={Link}
                   id="profile-logo"
                   to='/profile'
                   position="right">
          <Image src='#' shape='circular' bordered/>
        </Menu.Item>
      </Menu>
    )
  }
}

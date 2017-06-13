import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default class AppHeader extends Component {
  render() {
    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted>
        <Menu.Item as={Link} to="/">
          <img src={require("../images/agora_full_logo.jpg")} alt="logo" />
        </Menu.Item>
        <Menu.Item as={Link} to='/login'
                   icon="user outline"
                   onClick={this.openLogin}
                   position="right" />
      </Menu>
    )
  }
}
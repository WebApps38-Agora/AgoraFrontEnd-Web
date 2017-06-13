import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default class AppHeader extends Component {
  state = {}

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  openLogin = (e, { name }) => {
    this.state = {}
  };

  render() {
    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted>
        <Menu.Item as={Link} to="/">
          <img src={require("./agora_full_logo.jpg")} alt="logo" />
        </Menu.Item>
        <Menu.Item as={Link} to='/login'
                   icon="user outline"
                   onClick={this.openLogin}
                   position="right" />
      </Menu>
    )
  }
}

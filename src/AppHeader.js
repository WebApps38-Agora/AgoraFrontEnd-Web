import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Header } from 'semantic-ui-react'

export default class MenuExampleStackable extends Component {
  state = {}

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  openLogin = (e, { name }) => 5;

  render() {
    const { activeItem } = this.state;

    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted>
        <Link to="/"><Menu.Item><img src={require("./agora_full_logo.jpg")} /></Menu.Item></Link>
        <Menu.Item icon="user outline"
                   onClick={this.openLogin}
                   position="right">
        </Menu.Item>
      </Menu>
    )
  }
}

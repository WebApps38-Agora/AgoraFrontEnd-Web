import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

var GLOBAL = require('./Globals.js');

export default class MenuExampleStackable extends Component {
  state = {}

  openLogin = (e, { name }) => 5;

  render() {
    const { activeItem } = this.state


    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted>
        <Link to="/"><Menu.Item icon='home'></Menu.Item></Link>

        <Menu.Item header name='agora'>
          Agora
        </Menu.Item>

        <Menu.Item icon="user outline"
                   onClick={this.openLogin}
                   position="right">
        </Menu.Item>
      </Menu>
    )
  }
}

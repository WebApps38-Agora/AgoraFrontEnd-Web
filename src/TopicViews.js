import React, { Component } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import CommentSection from './CommentSection'

export default class TopicViews extends Component {
  state = { activeItem: '1' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Segment attached='top'>
          <CommentSection />
        </Segment>

        <Menu fluid widths={3} attached='bottom' tabular>
          <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick}>
            Summary
          </Menu.Item>

          <Menu.Item name='2' active={activeItem === '2'} onClick={this.handleItemClick}>
            Comments
          </Menu.Item>

          <Menu.Item name='3' active={activeItem === '3'} onClick={this.handleItemClick}>
            Stats
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

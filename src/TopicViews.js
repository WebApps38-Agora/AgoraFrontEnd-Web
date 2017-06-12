import React, { Component } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import CommentSection from './CommentSection'

export default class TopicViews extends Component {
  state = { activeItem: 'facts' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    let content;
    switch (this.state.activeItem) {
      case 'facts':
        content = <CommentSection />
        break;
      case 'discussion':
        content = <h2>Discussion</h2>
        break;
      case 'stats':
      default:
        content = <h2>Stats</h2>
        break;
    }

    return (
      <div>
        <Segment attached='top'>
          {content}
        </Segment>

        <Menu fluid widths={3} attached='bottom' tabular>
          <Menu.Item name='facts' active={activeItem === 'facts'} onClick={this.handleItemClick}>
            Summary
          </Menu.Item>

          <Menu.Item name='discussion' active={activeItem === 'discussion'} onClick={this.handleItemClick}>
            Comments
          </Menu.Item>

          <Menu.Item name='stats' active={activeItem === 'stats'} onClick={this.handleItemClick}>
            Stats
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

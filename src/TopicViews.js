import React, { Component } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import CommentSection from './CommentSection'
import FactSection from './FactSection'
import './Views.css'

export default class TopicViews extends Component {
  constructor(props) {
    super(props);
    console.log('topics views: ' + props.facts);
    this.state = {
      activeItem: 'facts',
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    let content;
    switch (this.state.activeItem) {
      case 'facts':
        content = <FactSection facts={this.props.facts}/>
        break;
      case 'discussion':
        content = <CommentSection topic_id={this.props}/>
        break;
      case 'stats':
      default:
        content = <h2>Stats</h2>
        break;
    }

    return (
      <div>
        <Segment attached='top' id="content">
          {content}
        </Segment>

        <Menu fluid widths={3} attached='bottom' tabular>
          <Menu.Item name='facts' active={activeItem === 'facts'} onClick={this.handleItemClick}>
            Facts
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Segment } from 'semantic-ui-react'

import CommentSection from './CommentSection'
import FactSection from './FactSection'
import '../style/Views.css'

class TopicViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'facts',
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem} = this.state;

    let realHeight = this.props.titleHeight + 20;

    let content;
    switch (this.state.activeItem) {
      case 'facts':
        content = <FactSection isFetching={this.props.isFetching} topic={this.props.topic}/>
        break;
      case 'discussion':
        content = <CommentSection isFetching={this.props.isFetching} topic={this.props.topic}/>
        break;
      case 'stats':
      default:
        content = <h2>Stats</h2>
        break;
    }

    return (
      <div style={{height: "calc(100% - " + realHeight + "px)"}}>
        <Segment attached='top' id="content">
          {content}
        </Segment>

        <Menu fluid widths={3} attached='bottom' tabular>
          <Menu.Item name='facts' active={activeItem === 'facts'} onClick={this.handleItemClick}>
            Facts
          </Menu.Item>

          <Menu.Item name='discussion' active={activeItem === 'discussion'} onClick={this.handleItemClick}>
            Discussion
          </Menu.Item>

          <Menu.Item name='stats' active={activeItem === 'stats'} onClick={this.handleItemClick}>
            Statistics
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default connect()(TopicViews)

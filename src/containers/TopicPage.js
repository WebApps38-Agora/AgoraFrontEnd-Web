import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Loader, Dimmer } from 'semantic-ui-react'
import { selectTopic } from '../actions/TopicIndex'
import { fetchTopic } from '../actions/TopicPage'
import Topic from '../presentational/Topic'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };
  }

  componentWillMount() {
    this.props.dispatch(selectTopic(this.state.id))
    this.props.dispatch(fetchTopic(this.state.id))
  }

  render() {
    if (!this.props.isFetching) {
      return <Topic topic={this.props.topic} />
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching:    Object.keys(state.topics).length == 0
                || !(state.selectedTopic in state.topics)
                || state.topics[state.selectedTopic].isFetching,
    topic: state.topics[state.selectedTopic] || {}
  }
}

export default connect(mapStateToProps)(TopicPage)

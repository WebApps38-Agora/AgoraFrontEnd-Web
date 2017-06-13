import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Loader, Dimmer } from 'semantic-ui-react'
import { selectTopic } from '../actions/TopicIndex'
import { fetchTopicIfNeeded } from '../actions/TopicPage'
import { fetchFactsIfNeeded } from '../actions/FactSection'
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
    this.props.dispatch(fetchTopicIfNeeded(this.state.id))
  }

  render() {
    if (this.props.isLoaded) {
      return <Topic topic={this.props.topic} />
    } else {
      return <Dimmer active><Loader>Loading topic</Loader></Dimmer>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoaded: state.selectedTopic in state.topics,
    topic: state.topics[state.selectedTopic] || {}
  }
}

export default connect(mapStateToProps)(TopicPage)

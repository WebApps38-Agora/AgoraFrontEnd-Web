import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopic } from '../actions/FactSection'
import { selectTopic } from '../actions/TopicIndex'
import Topic from '../presentational/Topic'

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(selectTopic(this.state.id))
  }

  render() {
    return (
      <Topic topic={this.props.topic} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topic: state.topics[state.selectedTopic] || {}
  }
}

export default connect(mapStateToProps)(TopicPage)

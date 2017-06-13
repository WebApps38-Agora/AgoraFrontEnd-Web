import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopics } from '../actions/TopicIndex'
import Topics from '../presentational/Topics'

class TopicIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchTopics())
  }

  render() {
    return (
      <Topics topics={this.props.topics} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topics || []
  }
}

export default connect(mapStateToProps)(TopicIndex)

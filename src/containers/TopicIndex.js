import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopics } from '../actions/TopicIndex'
import { Loader, Dimmer } from 'semantic-ui-react'
import Topics from '../presentational/Topics'

class TopicIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchTopics())
  }

  render() {
    if (!this.props.isFetching) {
      return <Topics topics={this.props.topics} />
    } else {
      return <Dimmer active><Loader>Loading the latest topics</Loader></Dimmer>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.topics.isFetching,
    topics: state.topics || []
  }
}

export default connect(mapStateToProps)(TopicIndex)

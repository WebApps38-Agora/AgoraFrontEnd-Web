import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopicsIfNeeded } from '../actions/TopicIndex'
import { Loader, Dimmer } from 'semantic-ui-react'
import Topics from '../presentational/Topics'

class TopicIndex extends Component {
  componentWillMount() {
    this.props.dispatch(fetchTopicsIfNeeded())
  }

  render() {
    if (this.props.loaded) {
      return <Topics topics={this.props.topics} />
    } else {
      return <Dimmer active><Loader>Loading the latest topics</Loader></Dimmer>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.topics.loaded,
    topics: state.topics || []
  }
}

export default connect(mapStateToProps)(TopicIndex)

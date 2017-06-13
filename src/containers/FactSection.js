import React, { Component } from 'react';
import { connect } from 'react-redux';

import Facts from '../presentational/Facts';
import { fetchFacts } from '../actions/FactSection';

class FactSection extends Component {
  render() {
    return this.props.isLoaded && <Facts facts={this.props.topic.fact_set} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoaded: state.selectedTopic in state.topics,
    topic: state.topics[state.selectedTopic] || [],
  }
}

export default connect(
  mapStateToProps
)(FactSection)

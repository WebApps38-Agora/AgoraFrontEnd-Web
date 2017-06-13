import React, { Component } from 'react';
import { connect } from 'react-redux';

import Facts from '../presentational/Facts';
import { fetchFacts } from '../actions/FactSection';

class FactSection extends Component {
  render() {
    return !this.props.isFetching && <Facts facts={this.props.topic.fact_set} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching:    Object.keys(state.topics).length == 0
                || !(state.selectedTopic in state.topics)
                || state.topics[state.selectedTopic].isFetching,
    topic: state.topics[state.selectedTopic] || [],
  }
}

export default connect(
  mapStateToProps
)(FactSection)

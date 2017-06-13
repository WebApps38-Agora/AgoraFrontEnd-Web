import React, { Component } from 'react';
import { connect } from 'react-redux';

import Facts from '../presentational/Facts';
import { fetchFacts } from '../actions/FactSection';

class FactSection extends Component {
  componentDidMount() {
    if (this.props.isLoaded) {
      this.props.dispatch(fetchFacts(this.props.topic.id))
    }
  }

  render() {
    return this.props.isLoaded && <Facts facts={this.props.topic.facts} />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Facts from './Facts';
import { fetchFacts } from './actions/FactSection';

class FactSection extends Component {
  componentDidMount() {
    this.props.dispatch(fetchFacts(this.props.selectedTopic))
  }

  render() {
    return (
      <Facts facts={this.props.facts} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedTopic: state.selectedTopic,
    facts: state.factsByTopic[state.selectedTopic] || [],
  }
}

export default connect(
  mapStateToProps
)(FactSection)

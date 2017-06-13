import React, { Component } from 'react';
import { connect } from 'react-redux';

import Facts from './Facts';
import factsByTopic from './reducers/FactSection';
import { fetchFacts, selectTopic } from './actions/FactSection';

class FactSection extends Component {
  constructor(props) {
    super(props)
  }

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

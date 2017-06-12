import React, { Component } from 'react';
import { connect } from 'react-redux';
import Facts from './Facts';
import factsByTopic from './reducers/FactSection';

const mapStateToProps = (state) => {
  return {
    facts: state.factsByTopic[state.selectedTopic]
  }
}

const FactSection = connect(
  mapStateToProps
)(Facts)

export default FactSection;

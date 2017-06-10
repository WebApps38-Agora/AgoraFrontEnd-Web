import React, { Component } from 'react';

class SummaryLayout extends Component {
  render() {
    const cs = this.state.comments.map((comment, index) =>
        <li key={index}> {comment} </li>
    );

    return (
      <h1>Summary Layout</h1>
    );
  }
}

export default SummaryLayout;

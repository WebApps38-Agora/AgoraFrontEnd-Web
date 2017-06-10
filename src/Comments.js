import React, { Component } from 'react';
import './Comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {comments: [1,2,3,4]};
  }

  render() {
    const cs = this.state.comments.map((comment) =>
        <li> {comment} </li>
    );

    return (
      <div id="center">
      <div id="inner">
        <ul>{cs}</ul>
      </div>
    </div>
    );
  }
}

export default Comments;

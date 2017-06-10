import React, { Component } from 'react';

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
      <ul>{cs}</ul>
    );
  }
}

export default Comments;

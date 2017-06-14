import React, { Component } from 'react';
import RaisedButton from '../node_modules/material-ui/RaisedButton';
import '../style/Comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {comments: [1,2,3,4]};
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  loadCommentsFromServer = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/').then(function(response) {
      return response.json();
    }).then(function(j) {
      component.setState({comments: [j.articles]});
    });
  }

  render() {
    const cs = this.state.comments.map((comment, index) =>
        <li key={index}> {comment} </li>
    );

    return (
      <div className="center">
        <div className="inner">
          <ul>{cs}</ul>
        </div>
        <RaisedButton label="Add Comment" />
      </div>
    );
  }
}

export default Comments;

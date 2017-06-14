import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import '../style/Comments.css';
import * as actions from '../actions/Comments'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment_content: ''
    }
  }

  makeComment(comment, index) {
    //const children = comment.children.map((comment, index) => makeComment(comment))
    const children = <div></div>

    return (
      <Comment key={index}>
        <Comment.Avatar src='http://www.ruralagriventures.com/wp-content/uploads/2017/05/man-team.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Elliot</Comment.Author>
          <Comment.Metadata>
            <div>{comment.published_at}</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>{comment.content}</p>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        <Comment.Group>
          {children}
        </Comment.Group>
      </Comment>
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch(actions.sendAddCommentRequest(this.props.topic.id, this.state.comment_content))
  }

  render() {
    const comments = this.props.topic.comment_set.map((comment, index) => this.makeComment(comment, index))

    return (
      <Comment.Group minimal>
        <Header as='h3' dividing>Comments</Header>
        {comments}
        <Form reply>
          <Form.TextArea
            value={this.state.comment_contnet}
            onChange={(e, {name, value}) => this.setState({comment_content: value})}
          />
          <Button onClick={this.handleSubmit} content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    )
  }
}

export default connect()(Comments);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import '../style/Comments.css';
import * as actions from '../actions/Comments'

function arraysEqual(arr1, arr2) {
    if (!arr1 || !arr2) return false

    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment_content: '',
    }
  }

  handleClickReply(e, comment, parents) {
    this.props.dispatch(actions.showReplyInput(this.props.topic.id, [...Object.keys(parents), comment.id]))
  }

  makeComment(comment, parents) {
    const children = Object.keys(comment.comments).map((id) => {
      let child = comment.comments[id]
      return this.makeComment(child, [...parents, comment])
    })

    console.log("parents")
    console.log(this.props.topic.reply_to_comment)
    console.log([...Object.keys(parents), comment.id])
    const replyInput = arraysEqual(this.props.topic.reply_to_comment, [...Object.keys(parents), comment.id]) ?
      "replying"
    : null

    return (
      <Comment key={comment.id}>
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
            <Comment.Action onClick={(e) => this.handleClickReply(e, comment, parents)}>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        {children.length > 0 || replyInput ?
          <Comment.Group>
            {children}
            {replyInput}
          </Comment.Group>
        : null}
      </Comment>
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch(actions.sendAddCommentRequest(this.props.topic.id, this.state.comment_content))
  }

  render() {
    let comments = []
    Object.keys(this.props.comment_hierarchy).forEach((id, index) => {
      comments.push(this.makeComment(this.props.comment_hierarchy[id], []))
    })

    return (
      <Comment.Group minimal>
        <Header as='h3' dividing>Comments</Header>
        {comments}
        <Form reply>
          <Form.TextArea
            value={this.state.comment_content}
            onChange={(e, {name, value}) => this.setState({comment_content: value})}
          />
          <Button onClick={this.handleSubmit} content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    const comment_set = ownProps.topic.comment_set

    let comment_hierarchy = {...comment_set}
    Object.keys(comment_set).forEach((id) => {
      comment_hierarchy[id] = {
        ...comment_set[id],
        comments: {}
      }
    })

    Object.keys(comment_set).forEach((id) => {
      const parent = comment_hierarchy[id].parent_comment
      if (parent != null) {
        comment_hierarchy[parent].comments[id] = comment_hierarchy[id]
        delete comment_hierarchy[id]
      }
    })

  return {
    comment_hierarchy: comment_hierarchy
  }
}

export default connect(mapStateToProps)(Comments);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Segment, Button, Comment, Form, Label } from 'semantic-ui-react'
import Textarea from 'react-textarea-autosize';
import '../style/Views.css';
import '../style/CommentSection.css';
import * as actions from '../actions/CommentActions'
import Missing from './Missing'
var moment = require('moment')

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

class CommentSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment_content: '',
      reply_content: '',
      textAreaHeight: 60,
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

    const replyInput = arraysEqual(this.props.topic.reply_to_comment, [...Object.keys(parents), comment.id]) ?
      <Form reply id="reply-form">
        <Form.Group>
          <Textarea
            minRows={1}
            maxRows={3}
            value={this.state.reply_content}
            onChange={ (e) => this.setState({reply_content: e.target.value}) }
            onHeightChange={ (height, instance) => this.updateTextAreaSize(height)}
            placeholder='Write a reply or a new comment on the topic...' />
          <Button onClick={(e) => this.handleSubmit(e, this.state.reply_content, [...parents, comment.id].slice(-1)[0])}
                  disabled={this.state.reply_content === ''}
                  content='Comment'
                  labelPosition='left' icon='edit' primary />
        </Form.Group>
      </Form>
    : null

    const profile = this.props.profiles[comment.owner_profile]

    return (
      <Comment key={comment.id}>
        <Comment.Avatar src={profile.profile_picture} />
        <Comment.Content>
          <Comment.Author as='a' href='/profile/'>{profile.first_name} {profile.last_name}</Comment.Author>
          <Comment.Metadata>
            <Label color={profile.political_color}>{profile.political_stance}</Label>
          </Comment.Metadata>
          <Comment.Text>
            <p>{comment.content}</p>
          </Comment.Text>
          <Comment.Actions>
            <div>{moment(comment.published_at).fromNow()}</div>
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

  handleSubmit = (e, content, parent) => {
    e.preventDefault()
    this.props.dispatch(actions.sendAddCommentRequest(this.props.topic.id, content, parent))
  }

  updateTextAreaSize(height) {
    console.log(height);
    this.setState({ textAreaHeight: height - 38});
  }

  render() {
    let comments = []
    Object.keys(this.props.comment_hierarchy).forEach((id, index) => {
      comments.push(this.makeComment(this.props.comment_hierarchy[id], []))
    })

    if (!comments.length) {
      comments = (<Missing icon="comments" icon_size="massive"
                           header="No comments on this topic."
                           description="Start the discussion on this topic by writing a comment below." />);
    }

    return (
      <div className="section" id="comment-section">
        <div className="section-height">
          <Comment.Group minimal style={{height: "calc(100% - " + this.state.textAreaHeight + "px)",
                                        maxWidth: "none"}}>
            <Segment vertical className="section-content" id="comments">
              {comments}
            </Segment>
            <Segment vertical>
              <Form reply id="comment-form">
                <Form.Group>
                  <Textarea
                    minRows={1}
                    maxRows={3}
                    value={this.state.comment_content}
                    onChange={ (e) => this.setState({comment_content: e.target.value}) }
                    onHeightChange={ (height, instance) => this.updateTextAreaSize(height)}
                    placeholder='Write a reply or a new comment on the topic...' />
                  <Button onClick={(e) => this.handleSubmit(e, this.state.comment_content, null)}
                          disabled={this.state.comment_content === ''}
                          content='Comment'
                          labelPosition='left' icon='edit' primary />
                </Form.Group>
              </Form>
            </Segment>
          </Comment.Group>
        </div>
      </div>
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

export default connect(mapStateToProps)(CommentSection);

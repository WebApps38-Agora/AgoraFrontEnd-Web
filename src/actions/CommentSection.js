import ActionsHelper from './ActionsHelper'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export function addCommentRequest(topic, content) {
  return {
    type: ADD_COMMENT_REQUEST,
    topic,
    content
  }
}

export const ADD_COMMENT_RESPONSE = 'ADD_COMMENT_RESPONSE'
export function addCommentResponse(topic, json) {
  return {
    type: ADD_COMMENT_RESPONSE,
    topic: topic,
    comment: json
  }
}

export const SHOW_REPLY_INPUT = 'SHOW_REPLY_INPUT'
export function showReplyInput(topic, chain) {
  return {
    type: SHOW_REPLY_INPUT,
    topic,
    chain,
  }
}

export function sendAddCommentRequest(topic, content) {
  return ActionsHelper.sendPost('/comments/', (dispatch) => {
    dispatch(addCommentRequest())
  }, (dispatch, getState, response) => {
    dispatch(addCommentResponse())
  }, {
    topic: topic,
    content: content,
    parent_comment: null,
  })
}

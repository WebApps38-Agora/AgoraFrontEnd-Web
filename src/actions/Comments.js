import fetch from 'isomorphic-fetch'
import Globals from '../globals'

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

export function sendAddCommentRequest(topic, content) {
  return function (dispatch, getState) {
    dispatch(addCommentRequest())

    return fetch(`${Globals.BACKEND_URL}/comments/`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + getState().loginKey
        }),
        body: JSON.stringify({
          topic: Globals.BACKEND_URL + `/topics/${topic}/`,
          content: content,
          parent_comment: null,
        })
    }).then(response => response.json())
      .then(json => {
        dispatch(addCommentResponse(topic, json))
      })
  }
}

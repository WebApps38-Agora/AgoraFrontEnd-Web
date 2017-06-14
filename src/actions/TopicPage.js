import fetch from 'isomorphic-fetch'
import Globals from '../globals'

export const REQUEST_TOPIC = 'REQUEST_TOPIC'
export function requestTopic(topic) {
  return {
    type: REQUEST_TOPIC,
    topic
  }
}

export const RECEIVE_TOPIC = 'RECEIVE_TOPIC'
export function receiveTopic(json) {
  return {
    type: RECEIVE_TOPIC,
    topic: json
  }
}

export function fetchTopic(topic) {

  return function (dispatch, getState) {
    dispatch(requestTopic(topic))

    return fetch(`${Globals.BACKEND_URL}/topics/${topic}/`, {
      headers: {
        Authorization: 'Token ' + getState().loginKey
      }
    }).then(response => response.json())
      .then(json => {
        dispatch(receiveTopic(json))
      })
  }
}

import ActionsHelper from './ActionsHelper'

export const SELECT_TOPIC = 'SELECT_TOPIC'
export function selectTopic(topic) {
  return {
    type: SELECT_TOPIC,
    topic
  }
}

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
  return ActionsHelper.sendGet(`/topics/${topic}/`, (dispatch) => {
    dispatch(requestTopic(topic))
  }, (dispatch, getState, response) => {
    dispatch(receiveTopic(response))
  })
}

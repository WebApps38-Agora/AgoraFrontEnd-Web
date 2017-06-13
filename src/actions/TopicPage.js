import fetch from 'isomorphic-fetch'

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

    return fetch(`${getState().backendUrl}/topics/${topic}/`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        dispatch(receiveTopic(json))
      })
  }
}

export function fetchTopicIfNeeded(topic) {
  return (dispatch, getState) => {
    if (!(topic in getState().topics)) {
      dispatch(fetchTopic(topic))
    }
  }
}

import fetch from 'isomorphic-fetch'

export const REQUEST_TOPIC = 'REQUEST_TOPIC'
export function requestTopic(topic) {
  return {
    type: REQUEST_TOPIC,
    topic
  }
}

export const RECEIVE_TOPIC = 'RECEIVE_TOPIC'
export function receiveTopic(topic, json) {
  return {
    type: RECEIVE_TOPIC,
    topic,
    topics: json.results
  }
}

export function fetchTopic(topic) {

  return function (dispatch) {
    dispatch(requestTopic(topic))

    return fetch(`https://agora-be.herokuapp.com/topic/${topic}`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTopic(topic, json))
      }
      )
  }
}

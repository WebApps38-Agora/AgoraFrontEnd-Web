import fetch from 'isomorphic-fetch'

export const SELECT_TOPIC = 'SELECT_TOPIC'
export function selectTopic(topic) {
  return {
    type: SELECT_TOPIC,
    topic
  }
}

export const REQUEST_TOPICS = 'REQUEST_TOPICS'
export function requestTopics() {
  return {
    type: REQUEST_TOPICS,
  }
}

export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'
export function receiveTopics(json) {
  return {
    type: RECEIVE_TOPICS,
    topics: json.results
  }
}

export function fetchTopics(topic) {

  return function (dispatch) {
    dispatch(requestTopics(topic))

    return fetch(`https://agora-be.herokuapp.com/topics/`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTopics(json))
      })
  }
}

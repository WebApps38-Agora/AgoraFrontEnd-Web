import fetch from 'isomorphic-fetch'

export const ADD_FACT_REQUEST = 'ADD_FACT_REQUEST'
export function addFactRequest(topic, content) {
  return {
    type: ADD_FACT_REQUEST,
    topic,
    content
  }
}

export const ADD_FACT_RESPONSE = 'ADD_FACT_RESPONSE'
export function addFactResponse(json) {
  return {
    type: ADD_FACT_RESPONSE,
    topic: json.topic,
    fact: json
  }
}

export const REQUEST_FACTS = 'REQUEST_FACTS'
export function requestFacts(topic) {
  return {
    type: REQUEST_FACTS,
    topic
  }
}

export const RECEIVE_FACTS = 'RECEIVE_FACTS'
export function receiveFacts(topic, json) {
  return {
    type: RECEIVE_FACTS,
    topic,
    facts: json.results
  }
}

export function fetchFacts(topic) {

  return function (dispatch, getState) {
    dispatch(requestFacts(topic))

    return fetch(`${getState().backendUrl}/facts/topic/${topic}/`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFacts(topic, json))
      })
  }
}

export function fetchFactsIfNeeded(topic) {
  return (dispatch, getState) => {
    if (getState().topics[topic].facts === []) {
      dispatch(fetchFacts(topic))
    }
  }
}

export function sendAddFactRequest(topic, content) {
  return function (dispatch, getState) {
    dispatch(addFactRequest())

    return fetch(`${getState().backendUrl}/facts/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: topic,
          owner: 1,
          content: content
        })
    }).then(response => response.json())
      .then(json => {
        dispatch(addFactResponse(json))
      })
  }
}

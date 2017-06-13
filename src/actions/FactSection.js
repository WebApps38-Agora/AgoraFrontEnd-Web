import fetch from 'isomorphic-fetch'

export const ADD_FACT = 'ADD_FACT'
export function addFact(fact) {
  return {
    type: ADD_FACT,
    fact
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

  return function (dispatch) {
    dispatch(requestFacts(topic))

    return fetch(`https://agora-be.herokuapp.com/facts/topic/${topic}/`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFacts(topic, json))
      }
      )
  }
}

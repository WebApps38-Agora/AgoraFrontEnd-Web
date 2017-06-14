import Globals from '../globals'
import ActionsHelper from './ActionsHelper'

export const ADD_FACT_REQUEST = 'ADD_FACT_REQUEST'
export function addFactRequest(topic, content) {
  return {
    type: ADD_FACT_REQUEST,
    topic,
    content
  }
}

export const ADD_FACT_RESPONSE = 'ADD_FACT_RESPONSE'
export function addFactResponse(topic, json) {
  return {
    type: ADD_FACT_RESPONSE,
    topic: topic,
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

export function fetchFactsIfNeeded(topic) {
  return (dispatch, getState) => {
    if (getState().topics[topic].facts === []) {
      dispatch(fetchFacts(topic))
    }
  }
}

export function fetchFacts(topic) {
  return ActionsHelper.sendGet('/fact/topic/', (dispatch) => {
    dispatch(requestFacts(topic))
  }, (dispatch, getState, response) => {
    dispatch(receiveFacts(response))
  })
}


export function sendAddFactRequest(topic, content) {
  return ActionsHelper.sendPost('/facts/', (dispatch) => {
    dispatch(addFactRequest(topic))
  }, (dispatch, getState, response) => {
    dispatch(addFactResponse(topic, response))
  }, {
    topic: Globals.BACKEND_URL + `/topics/${topic}/`,
    content: content,
    factreaction_set: []
  })
}

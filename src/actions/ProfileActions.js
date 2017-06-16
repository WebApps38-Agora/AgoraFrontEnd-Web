import ActionsHelper from './ActionsHelper'

export const ADD_FACT_REQUEST = 'ADD_FACT_REQUEST'
export function addFactRequest(topic, content) {
  return {
    type: ADD_FACT_REQUEST,
    topic,
    content
  }
}

export const ADD_PROFILE_WARNING = 'ADD_PROFILE_WARNING'
export function addProfileWarning() {
  return {
    type: ADD_PROFILE_WARNING
  }
}

export const REMOVE_PROFILE_WARNING = 'REMOVE_PROFILE_WARNING'
export function removeProfileWarning(topic, content) {
  return {
    type: REMOVE_PROFILE_WARNING
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

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export function requestProfile() {
  return {
    type: REQUEST_PROFILE
  }
}

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile
  }
}

export function fetchProfile() {
  return ActionsHelper.sendGet('/profiles', (dispatch) => {
    dispatch(requestProfile())
  }, (dispatch, getState, response) => {
    dispatch(receiveProfile(response))
  })
}

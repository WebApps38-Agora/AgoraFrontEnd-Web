import Cookies from 'js-cookie'
import ActionsHelper from './ActionsHelper'

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export function receiveLogin(key) {
  return {
    type: RECEIVE_LOGIN,
    key
  }
}

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
    topics: json.results,
    nextPage: json.next
  }
}

export function fetchTopics() {
  return (dispatch, getState) => {
    return ActionsHelper.sendGet('/topics/', (dispatch) => {
      dispatch(requestTopics())
    }, (dispatch, getState, response) => {
      dispatch(receiveTopics(response))
    })(dispatch, getState)
  }
}

export function fetchTopicsIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().topics.loaded) {
      dispatch(fetchTopics())
    }
  }
}

export function sendLogin(accessToken) {
  return (dispatch, getState) => {
    return ActionsHelper.sendPost('/rest_auth/facebook/', () => {}, (dispatch, getState, response, accessToken) => {
      dispatch(receiveLogin(response.key))
      Cookies.set('login_key', response.key ,{expires : 7})
    }, {
        method: 'post',
      	headers: {'content-type': 'application/json'},
        body: JSON.stringify({
      		access_token: accessToken
      	})
      }
    )(dispatch, getState)
  }
}

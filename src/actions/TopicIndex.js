import fetch from 'isomorphic-fetch'
import Cookies from 'js-cookie'
import Globals from '../globals'

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

  return function (dispatch, getState) {
    dispatch(requestTopics())

    return fetch(`${Globals.BACKEND_URL}/topics/`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTopics(json))
      })
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
    return fetch(`${Globals.BACKEND_URL}/rest_auth/facebook/`, {
        method: 'post',
      	headers: {'content-type': 'application/json'},
        body: JSON.stringify({
      		access_token: accessToken
      	})
    }).then( (r)=> r.json())
      .then( (j) => {
          dispatch(receiveLogin(j.key)) //j.key is the returned key
          Cookies.set('login_key', j.key ,{expires : 7})
      })
  }
}

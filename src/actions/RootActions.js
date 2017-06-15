import Cookies from 'js-cookie'
import Globals from '../globals'
import ActionsHelper from './ActionsHelper'

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export function receiveLogin(key) {
  return {
    type: RECEIVE_LOGIN,
    key
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

export const HANDLE_TOPICS_ERROR = 'HANDLE_TOPICS_ERROR'
export function handleTopicsError(error) {
  return {
    type: HANDLE_TOPICS_ERROR,
    error
  }
}

export function fetchTopics(url) {
  return (dispatch, getState) => {
    return ActionsHelper.sendURLGet(url, (dispatch) => {
      dispatch(requestTopics())
    }, (dispatch, getState, response) => {
      dispatch(receiveTopics(response))
    }, (dispatch, getState, error) => {
      dispatch(handleTopicsError(error))
    })(dispatch, getState)
  }
}

export function fetchTopicsIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().topics.loaded) {
      dispatch(fetchTopics(Globals.BACKEND_URL + '/topics'))
    }
  }
}

export function fetchMoreTopics() {
  return (dispatch, getState) => {
    dispatch(fetchTopics(getState().topics.nextPage))
  }
}

export function sendLogin(accessToken) {
  return ActionsHelper.sendPost('/rest_auth/facebook/', (dispatch, getState) => {
  }, (dispatch, getState, response) => {
    dispatch(receiveLogin(response.key))
    Cookies.set('login_key', response.key ,{expires : 7})
  }, {
    access_token: accessToken
  })
}

import Cookies from 'js-cookie'
import Globals from '../globals'
import ActionsHelper from './ActionsHelper'
import { fetchCurrentProfile, updateProfile } from './ProfileActions'

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
export function receiveTopics(json, replace) {
  return {
    type: RECEIVE_TOPICS,
    topics: json.results,
    nextPage: json.next,
    replace: replace,
  }
}

export const HANDLE_TOPICS_ERROR = 'HANDLE_TOPICS_ERROR'
export function handleTopicsError(error) {
  return {
    type: HANDLE_TOPICS_ERROR,
    error
  }
}

export function fetchTopics(url, replace) {
  return (dispatch, getState) => {
    return ActionsHelper.sendURLGet(url, (dispatch) => {
      dispatch(requestTopics())
    }, (dispatch, getState, response) => {
      dispatch(receiveTopics(response, replace))
    }, (dispatch, getState, error) => {
      dispatch(handleTopicsError(error))
    })(dispatch, getState)
  }
}

export function fetchNewestTopics() {
  return ActionsHelper.sendGet('/topics/latest/', (dispatch) => {
    dispatch(requestTopics())
  }, (dispatch, getState, response) => {
    dispatch(receiveTopics(response, true))
  }, (dispatch, getState, error) => {
    dispatch(handleTopicsError(error))
  })
}

export function fetchTopicsIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().topics.loaded) {
      dispatch(fetchTopics(Globals.BACKEND_URL + '/topics', false))
    }
  }
}

export function fetchMoreTopics() {
  return (dispatch, getState) => {
    dispatch(fetchTopics(getState().topics.nextPage, false))
  }
}

export function sendLogin(data) {
  return ActionsHelper.sendPost('/rest_auth/facebook/', (dispatch, getState) => {
  }, (dispatch, getState, response) => {
    dispatch(receiveLogin(response.key))
    Cookies.set('login_key', response.key ,{expires : 7})
    dispatch(updateProfile(data, getState().myProfile.id))
    dispatch(fetchCurrentProfile())
  }, {
    access_token: data.tokenDetail.accessToken
  })
}

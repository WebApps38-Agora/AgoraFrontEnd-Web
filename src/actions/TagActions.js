import ActionsHelper from './ActionsHelper'

export const REQUEST_TAGS = 'REQUEST_TAGS'
export function requestTags() {
  return {
    type: REQUEST_TAGS,
  }
}

export const RECEIVE_TAGS = 'RECEIVE_TAGS'
export function receiveTags(json) {
  return {
    type: RECEIVE_TAGS,
    tags: json.results,
    nextPage: json.next
  }
}

export const REQUEST_TOPICS_FOR_TAG = 'REQUEST_TOPICS_FOR_TAG'
export function requestTopicsForTag(tag) {
  return {
    type: REQUEST_TOPICS_FOR_TAG,
    tag,
  }
}

export const RECEIVE_TOPICS_FOR_TAG = 'RECEIVE_TOPICS_FOR_TAG'
export function receiveTopicsForTag(json) {
  return {
    type: RECEIVE_TOPICS_FOR_TAG,
    topics: json.topics,
    nextPage: json.next,
  }
}

export const FILTER_BY_TAG = 'FILTER_BY_TAG'
export function filterByTag(tag) {
  return {
    type: FILTER_BY_TAG,
    tag: tag,
  }
}

export const TOGGLE_TAGS = 'TOGGLE_TAGS'
export function toggleTags() {
  return {
    type: TOGGLE_TAGS,
  }
}


export function fetchTags() {
  return ActionsHelper.sendGet('/tags/', (dispatch) => {
    dispatch(requestTags())
  }, (dispatch, getState, response) => {
    dispatch(receiveTags(response))
  })
}

export function fetchTopicsForTag(tag) {
  return ActionsHelper.sendGet('/tags/' + tag + '/', (dispatch) => {
    dispatch(requestTopicsForTag())
  }, (dispatch, getState, response) => {
    dispatch(receiveTopicsForTag(response))
  })
}

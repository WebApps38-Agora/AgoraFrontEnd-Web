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

export const FILTER_BY_TAG = 'FILTER_BY_TAG'
export function filterByTag(tag) {
  return {
    type: FILTER_BY_TAG,
    tag: tag,
  }
}

export function fetchTags() {
  return ActionsHelper.sendGet('/tags/', (dispatch) => {
    dispatch(requestTags())
  }, (dispatch, getState, response) => {
    dispatch(receiveTags(response))
  })
}

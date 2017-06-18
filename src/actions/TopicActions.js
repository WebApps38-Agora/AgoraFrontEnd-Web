import ActionsHelper from './ActionsHelper'
import { fetchMetrics } from './MetricsActions'
import { fetchUserProfile } from './ProfileActions'

export const SELECT_TOPIC = 'SELECT_TOPIC'
export function selectTopic(topic) {
  return {
    type: SELECT_TOPIC,
    topic
  }
}

export const REQUEST_TOPIC = 'REQUEST_TOPIC'
export function requestTopic(topic) {
  return {
    type: REQUEST_TOPIC,
    topic
  }
}

export const RECEIVE_TOPIC = 'RECEIVE_TOPIC'
export function receiveTopic(json) {
  return {
    type: RECEIVE_TOPIC,
    topic: json
  }
}

export function fetchMetricsForTopic(topic) {
  return (dispatch, getState) => {
    Object.keys(getState().topics.items[topic].article_set).forEach((article) => {
      dispatch(fetchMetrics(topic, article))
    })
  }
}

export function fetchCommentProfilesForTopic(topic) {
  return (dispatch, getState) => {
    Object.keys(getState().topics.items[topic].comment_set).forEach((id) => {
      const comment = getState().topics.items[topic].comment_set[id]
      dispatch(fetchUserProfile(comment.owner_profile))
    })
  }
}

export function fetchTopic(topic) {
  return ActionsHelper.sendGet(`/topics/${topic}/`, (dispatch) => {
    dispatch(requestTopic(topic))
  }, (dispatch, getState, response) => {
    dispatch(receiveTopic(response))
    console.log(topic);
    console.log(getState().topics.items[topic]);
    dispatch(fetchMetricsForTopic(topic))
    dispatch(fetchCommentProfilesForTopic(topic))
  })
}

import { combineReducers } from 'redux'
import {
  SELECT_TOPIC, REQUEST_TOPICS, RECEIVE_TOPICS
} from '../actions/TopicIndex'

export function selectedTopic(state = 0, action) {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.topic
    default:
      return state
  }
}

export function topics(state = [], action) {
  switch (action.type) {
    case RECEIVE_TOPICS:
      return action.topics
    default:
      return state
  }
}

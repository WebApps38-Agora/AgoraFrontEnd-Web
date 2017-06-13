import { combineReducers } from 'redux'
import update from 'immutability-helper'
import {
  SELECT_TOPIC, REQUEST_TOPICS, RECEIVE_TOPICS
} from '../actions/TopicIndex'
import {
  REQUEST_FACTS, RECEIVE_FACTS
} from '../actions/FactSection'
import {
  REQUEST_TOPIC, RECEIVE_TOPIC
} from '../actions/TopicPage'

export function selectedTopic(state = 0, action) {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.topic
    default:
      return state
  }
}

export function topics(state = {}, action) {
  switch (action.type) {
    case REQUEST_TOPICS:
      return update(state, {
        isFetching: {$set: true}
      })

    case RECEIVE_TOPICS:
      let topics = {}
      action.topics.map((topic, index) => {
        topics[topic.id] = {
          ...topic,
          article_set: [],
          fact_set: [],
          isFetching: false
        }
      })

      return update(state, {
        isFetching: {$set: false},
        loaded: {$set: true},
        items: {$merge: topics}
      })

    case RECEIVE_FACTS:
      return update(state, {
        items: {
          [action.topic]: {
            facts: {
              $push: action.facts
            }
          }
        }
      })

    case REQUEST_TOPIC:
      return update(state, {
        items: {
          $merge: {[action.topic]: {
            isFetching: true
          }}
        }
      })

    case RECEIVE_TOPIC:
      return update(state, {
        items: {
          $merge: {[action.topic.id]: {
            ...action.topic,
            isFetching: false
          }}
        }
      })
    default:
      return state
  }
}

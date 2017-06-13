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
    case RECEIVE_TOPICS:
      let topics = {}
      action.topics.map((topic, index) => {
        topics[topic.id] = {
          ...topic,
          facts: []
        }
      })
      return topics

    case RECEIVE_FACTS:
      return update(state, {
        [action.topic]: {
          facts: {
            $push: action.facts
          }
        }
      })

    case RECEIVE_TOPIC:
      console.log(action)
      return update(state, {
        $merge: {[action.topic.id]: {
          ...action.topic,
          facts: []
        }}
      })
    default:
      return state
  }
}

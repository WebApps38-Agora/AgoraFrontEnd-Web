import update from 'immutability-helper'
import {
  SELECT_TOPIC, REQUEST_TOPICS, RECEIVE_TOPICS, RECEIVE_LOGIN
} from '../actions/TopicIndex'
import {
  RECEIVE_FACTS, ADD_FACT_RESPONSE
} from '../actions/FactSection'
import {
  ADD_COMMENT_RESPONSE, SHOW_REPLY_INPUT
} from '../actions/Comments'
import {
  REQUEST_TOPIC, RECEIVE_TOPIC
} from '../actions/TopicPage'

import Globals from '../globals'

export function selectedTopic(state = 0, action) {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.topic
    default:
      return state
  }
}

export function loginKey(state = false, action) {
  switch (action.type) {
    case RECEIVE_LOGIN:
      return action.key
    default:
      return state
  }
}

const createTopic = (topic) => {
  let new_comment_set = {}
  console.log(topic)
  topic.comment_set.forEach((comment) => {
    new_comment_set[comment.id] = comment
  })

  return {
    ...topic,
    comment_set: new_comment_set,
    isFetching: false,
    url: `${Globals.BACKEND_URL}/topics/${topic.id}/`,
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
      action.topics.forEach((topic) => {
          topics[topic.id] = createTopic(topic)
        }
      )

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
          $merge: {[action.topic.id]: createTopic(action.topic)}
        }
      })

    case ADD_FACT_RESPONSE:
      return update(state, {
        items: {
          [action.topic]: {
            fact_set: {
              $push: [action.fact]
            }
          }
        }
      })

    case ADD_COMMENT_RESPONSE:
      return update(state, {
        items: {
          [action.topic]: {
            comment_set: {
              $push: [action.comment]
            }
          }
        }
      })

    case SHOW_REPLY_INPUT:
      console.log(action.chain)
      console.log(action.topic)
      return update(state, {
        items: {
          [action.topic]: {
            reply_to_comment: {$set: action.chain}
          }
        }
      })

    default:
      return state
  }
}

import update from 'immutability-helper'
import {
  REQUEST_TOPICS, RECEIVE_TOPICS, RECEIVE_LOGIN, HANDLE_TOPICS_ERROR
} from '../actions/RootActions'
import {
  RECEIVE_FACTS, ADD_FACT_RESPONSE
} from '../actions/FactActions'
import {
  ADD_COMMENT_RESPONSE, SHOW_REPLY_INPUT
} from '../actions/CommentActions'
import {
  SELECT_TOPIC, REQUEST_TOPIC, RECEIVE_TOPIC
} from '../actions/TopicActions'
import {
  RECEIVE_PROFILE
} from '../actions/ProfileActions'

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

const createTopic = (topic, deep) => {
  let new_comment_set = {}

  let extra = {}
  if (deep) {
    topic.comment_set.forEach((comment) => {
      new_comment_set[comment.id] = comment
    })

    extra = {
      comment_set: new_comment_set,
    }
  } else {
    extra = {
      comment_set: {},
      fact_set: [],
      article_set: [],
    }
  }

  return {
    ...topic,
    ...extra,
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
      let topics = state.items
      action.topics.forEach((topic) => {
          topics.push(createTopic(topic, false))
        }
      )

      return update(state, {
        isFetching: {$set: false},
        loaded: {$set: true},
        items: {$set: topics},
        nextPage: {$set: action.nextPage}
      })

    case HANDLE_TOPICS_ERROR:
      return update(state, {
        isFetching: {$set: false},
        noMoreTopics: {$set: true}
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
          $merge: {[action.topic.id]: createTopic(action.topic, true)}
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
              $merge: {
                [action.comment.id]: action.comment
              }
            }
          }
        }
      })

    case SHOW_REPLY_INPUT:
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

export function myProfile(state = 0, action) {
  switch (action.type) {
    case RECEIVE_PROFILE:
      console.log(action);
      return action.profile
    default:
      return state
  }
}

export function profiles(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

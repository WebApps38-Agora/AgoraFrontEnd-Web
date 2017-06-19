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
  REQUEST_METRICS, RECEIVE_METRICS, RATE_BIAS_RECEIVE
} from '../actions/MetricsActions'
import {
  RECEIVE_CURRENT_PROFILE, RECEIVE_PROFILE, ADD_PROFILE_RESPONSE, ADD_PROFILE_WARNING, REMOVE_PROFILE_WARNING, HANDLE_PROFILE_ERROR
} from '../actions/ProfileActions'
import {
  REQUEST_TAGS, RECEIVE_TAGS, FILTER_BY_TAG, RECEIVE_TOPICS_FOR_TAG, TOGGLE_TAGS
} from '../actions/TagActions'

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

export function tags(state = {}, action) {
  let MAX_TAG_NUM = 12

  switch (action.type) {
    case REQUEST_TAGS: {
      return update(state, {
        isFetching: {$set: true}
      })
    }

    case RECEIVE_TAGS: {
      return update(state, {
        isFetching: {$set: false},
        items: {
          $merge: action.tags.slice(0, MAX_TAG_NUM)
        }
      })
    }

    case FILTER_BY_TAG: {
      return update(state, {
        currentFilter: {$set: action.tag}
      })
    }

    case TOGGLE_TAGS: {
      return update(state, {
        showing: {$set: !state.showing}
      })
    }

    default: {
      return state
    }
  }
}

export function profileWarnings(state = false, action) {
  switch (action.type) {
    case ADD_PROFILE_WARNING:
      return true
    case REMOVE_PROFILE_WARNING:
      return false
    default:
      return state
  }
}

const createTopic = (topic, deep) => {
  let new_comment_set = {}
  let new_article_set = {}

  let extra = {}
  if (deep) {
    topic.comment_set.forEach((comment) => {
      new_comment_set[comment.id] = comment
    })

    topic.article_set.forEach((article) => {
      article.metrics = {
        isFetching: false
      }
      new_article_set[article.id] = article
    })

    extra = {
      comment_set: new_comment_set,
      article_set: new_article_set,
    }
  } else {
    extra = {
      comment_set: {},
      fact_set: [],
      article_set: {},
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

    case RECEIVE_TOPICS_FOR_TAG:
    case RECEIVE_TOPICS:
      let topics = state.items
      // set default
      if (!state.items.result) {
        topics = { result: [] }
      }
      action.topics.forEach((topic, index) => {
        // if the topic already exists, don't change its ordering
        if (!topics[topic.id]) {
          topics.result.push(topic.id)
        }
        topics[topic.id] = createTopic(topic, false)
      })

      console.log(topics);

      return update(state, {
        isFetching: {$set: false},
        loaded: {$set: true},
        items: {$merge: topics},
        nextPage: {$set: action.nextPage}
      })

    case HANDLE_TOPICS_ERROR:
      console.error(action);
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
      console.log(action);
      return update(state, {
        items: {
          $merge: { [action.topic.id]: createTopic(action.topic, true) }
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

    case REQUEST_METRICS: {
      console.log("requesting metrics")
      console.log(action.topic)
      console.log(action)
      return update(state, {
        items: {
          [action.topic]: {
            article_set: {
              [action.article]: {
                metrics: {
                  isFetching: {$set: true}
                }
              }
            }
          }
        }
      })
    }

    case RECEIVE_METRICS: {
      return update(state, {
        items: {
          [action.topic]: {
            article_set: {
              [action.article]: {
                metrics: {$set: action.metrics}
              }
            }
          }
        }
      })
    }

    case RATE_BIAS_RECEIVE: {
      return update(state, {
        items: {
          [action.topic]: {
            metrics: {$set: action.metrics}
          }
        }
      })
    }

    default:
      return state
  }
}

export function myProfile(state = -1, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_PROFILE:
    case ADD_PROFILE_RESPONSE:
      return action.profile.id

    case HANDLE_PROFILE_ERROR:
      return action
    default:
      return state
  }
}

export function profiles(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_PROFILE:
    case RECEIVE_PROFILE:
      return update(state, {
        [action.profile.id]: {
          $set: action.profile
        }
      })

    default:
      return state
  }
}

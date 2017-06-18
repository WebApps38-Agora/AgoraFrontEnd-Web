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
  RECEIVE_PROFILE, ADD_PROFILE_RESPONSE, ADD_PROFILE_WARNING, REMOVE_PROFILE_WARNING, HANDLE_PROFILE_ERROR
} from '../actions/ProfileActions'
import {
  REQUEST_TAGS, RECEIVE_TAGS, FILTER_BY_TAG, RECEIVE_TOPICS_FOR_TAG
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
          $push: action.tags
        }
      })
    }

    case FILTER_BY_TAG: {
      return update(state, {
        currentFilter: {$set: action.tag}
      })
    }

    default: {
      return state
    }
  }
}

const findArticleIndex = (article_set, article_id) => {
  let found_index = -1;
  article_set.forEach((article, index) => {
    if (article.id === article_id) {
      found_index = index
    }
  })
  return found_index
}

const getTopicIndexById = (norm, id) => {
  norm.result.forEach()
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
    metrics: {
      isFetching: false
    }
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
      // denormalize items to get real topic data
      let topics = state.items
      if (!state.items.result) {
        topics = { result: [], entities: {} }
      }
      // let topics = denormalize(state.items.result, topicListSchema, state.items.entities) || []
      // concatinate received topics
      action.topics.forEach((topic, index) => {
        // if the topic already exists, don't change its ordering
        if (!topics.entities[topic.id]) {
          topics.result.push(topic.id)
        }
        topics.entities[topic.id] = topic
      })
      // console.log("RECEIVE_TOPICS");
      // console.log(topics);
      // topics = topics.concat(action.topics)
      // topics = normalize(topics, topicListSchema)

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

    case REQUEST_METRICS: {
      console.log("in reducer 2")
      console.log(action)
      console.log(state.items[action.topic])
      return update(state, {
        items: {
          [action.topic]: {
            article_set: {
              [findArticleIndex(state.items[action.topic].article_set, action.article)]: {
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

      console.log("in reducer")
      console.log(action)
      console.log(state.items[action.topic])
      return update(state, {
        items: {
          [action.topic]: {
            article_set: {
              [findArticleIndex(state.items[action.topic].article_set, action.article)]: {
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

export function myProfile(state = 0, action) {
  switch (action.type) {
    case RECEIVE_PROFILE:
      return action.profile

    case ADD_PROFILE_RESPONSE:
      return action.profile

    case HANDLE_PROFILE_ERROR:
      return action
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

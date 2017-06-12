import { combineReducers } from 'redux'
import {
  SELECT_TOPIC, ADD_FACT, REQUEST_FACTS, RECEIVE_FACTS
} from '../actions/FactSection'

function selectedTopic(state = {
  selectedTopic: 0
}, action) {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.topic
    default:
      return state
  }
}

function facts(state = [], action) {
  switch (action.type) {
    case RECEIVE_FACTS:
      return action.facts
    default:
      return state
  }
}

function factsByTopic(state = {}, action) {
  switch (action.type) {
    case RECEIVE_FACTS:
    case REQUEST_FACTS:
      return Object.assign({}, state, {
        [action.topic]: facts(state[action.topic], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedTopic,
  factsByTopic,
})

export default rootReducer

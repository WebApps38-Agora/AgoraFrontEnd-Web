import { combineReducers } from 'redux'
import {
  ADD_FACT, REQUEST_FACTS, RECEIVE_FACTS
} from '../actions/FactSection'

export function facts(state = [], action) {
  switch (action.type) {
    case RECEIVE_FACTS:
      return action.facts
    default:
      return state
  }
}

export function factsByTopic(state = {}, action) {
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

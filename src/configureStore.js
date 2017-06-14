import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { loginKey, selectedTopic, topics } from './reducers/TopicIndex'
import Cookies from 'js-cookie'

const login_key = Cookies.get('login_key') || false
const preloadedState = {
  loginKey: login_key,
  selectedTopic: 0,
  topics: {
    loaded: false,
    isFetching: false,
    items: {}
  }
}

const rootReducer = combineReducers({
  loginKey,
  selectedTopic,
  topics,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      ),
    )
  );
}

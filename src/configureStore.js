import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { notifications, loginKey, selectedTopic, topics, myProfile, profiles, tags, profileWarnings } from './reducers/RootReducer'
import { fetchProfileIfLoggedIn } from './actions/ProfileActions'
import Cookies from 'js-cookie'

const login_key = Cookies.get('login_key') || false
const preloadedState = {
  loginKey: login_key,
  selectedTopic: 0,
  topics: {
    loaded: false,
    isFetching: false,
    noMoreTopics: false,
    items: {},
    nextPage: ""
  },
  myProfile: 0,
  profiles: {},
  tags: {
    isFetching: false,
    currentFilter: false,
    showing: false,
    items: {}
  },
  notifications: {
    items: {}
  }
}

const rootReducer = combineReducers({
  profileWarnings,
  loginKey,
  selectedTopic,
  topics,
  myProfile,
  profiles,
  tags,
  notifications
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    ),
  )
);

store.dispatch(fetchProfileIfLoggedIn())

export default function configureStore() {
  return store;
}

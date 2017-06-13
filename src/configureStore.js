import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { selectedTopic, topics, facts } from './reducers/TopicIndex'

const BACKEND_URL_DEV = 'http://localhost:8000'
const BACKEND_URL_PROD = 'https://agora-be.herokuapp.com'

export const backendUrl = () => {
  return BACKEND_URL_DEV
}

const rootReducer = combineReducers({
  backendUrl,
  selectedTopic,
  topics,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      ),
    )
  );

  return store;
}

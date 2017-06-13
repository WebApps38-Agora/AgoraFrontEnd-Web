import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { selectedTopic, topics, facts } from './reducers/TopicIndex'

const backendUrl = (state, action) => {
  // return 'https://agora-be.herokuapp.com'
  return 'http://localhost:8000'
}

const rootReducer = combineReducers({
  backendUrl,
  selectedTopic,
  topics,
})

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  );

  return store;
}

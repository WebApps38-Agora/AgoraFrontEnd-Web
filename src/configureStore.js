import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { selectedTopic, topics, facts } from './reducers/TopicIndex'

const rootReducer = combineReducers({
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

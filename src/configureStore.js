import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { selectedTopic, topics } from './reducers/TopicIndex'
import { factsByTopic } from './reducers/FactSection'

const rootReducer = combineReducers({
  selectedTopic,
  topics,
  factsByTopic
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

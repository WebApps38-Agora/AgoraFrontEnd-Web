import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { selectTopic, fetchFacts } from './actions/FactSection'
import rootReducer from './reducers/FactSection'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  );

  store.dispatch(selectTopic(404));
  store.dispatch(fetchFacts(404)).then(() =>
    console.log(store.getState())
  );

  return store;
}

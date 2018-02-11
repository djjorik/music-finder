import { createStore, applyMiddleware  } from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer } from '../Reducers';

export default function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState, applyMiddleware(reduxThunk));
  return store;
}

import { createStore, applyMiddleware  } from 'redux';
import reduxThunk from 'redux-thunk';
import Reducers from '../Reducers';

export default function configureStore(initialState: any) {
  const store = createStore(Reducers, {}, applyMiddleware(reduxThunk));
  return store;
}

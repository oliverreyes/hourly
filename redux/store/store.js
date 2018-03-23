import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/reducers';
import thunkMiddleware from 'redux-thunk'

//const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware // allows the use of dispatching functions
  )
);

export default store;

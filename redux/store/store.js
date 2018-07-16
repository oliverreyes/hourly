import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import { offline } from '@redux-offline/redux-offline';
import config from '@redux-offline/redux-offline/lib/config';

//const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware // allows the use of dispatching functions
  ),
  offline(config)
);

export default store;

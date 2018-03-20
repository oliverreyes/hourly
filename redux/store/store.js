import { createStore } from 'redux';
import rootReducer from '../reducers/reducers.js';

let store = createStore(rootReducer);

export default store;

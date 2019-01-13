import { createStore,applyMiddleware } from 'redux'
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(rootReducer);
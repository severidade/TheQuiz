// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from './reducers';

// const store = createStore(rootReducer, undefined, applyMiddleware(thunkMiddleware));

// export default store;

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;

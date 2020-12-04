import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './modules';
import { authSuccess } from './modules/Auth';
import { setToken } from './helper/request';

const saveAuthToken = (store) => (next) => (action) => {
  if (action.type === authSuccess.toString()) {
    setToken(action.payload);
  }

  return next(action);
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, saveAuthToken));

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

// const createAppStore = () => {
//   const sagaMiddleware = createSagaMiddleware();

//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, saveAuthToken));

//   const store = createStore(rootReducer, {}, enhancer);

//   sagaMiddleware.run(rootSaga);

//   return store;
// };

// export default createAppStore;
export default store;

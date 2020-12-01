import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import auth, { sagas as authSagas } from './Auth';
import notification from './Notification';

export default combineReducers({ auth, notification });

export function* rootSaga() {
  yield fork(authSagas);
}

import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import auth, { sagas as authSagas } from './Auth';
import notification from './Notification';
import work, { sagas as workSaga } from './Work';
import workTypes, { sagas as workTypesSaga } from './WorkTypes';
import service, { sagas as servicesSaga } from './Service';

export default combineReducers({ auth, notification, work, workTypes, service });

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(workSaga);
  yield fork(workTypesSaga);
  yield fork(servicesSaga);
}

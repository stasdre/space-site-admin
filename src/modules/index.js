import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import auth, { sagas as authSagas } from './Auth';
import notification from './Notification';
import work, { sagas as workSaga } from './Work';
import workTypes, { sagas as workTypesSaga } from './WorkTypes';
import service, { sagas as servicesSaga } from './Service';
import initial, { sagas as initialSaga } from './Initial';
import lang, { sagas as langSaga } from './Lang';
import price, { sagas as priceSaga } from './Price';

export default combineReducers({
  auth,
  notification,
  work,
  workTypes,
  service,
  initial,
  lang,
  price,
});

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(workSaga);
  yield fork(workTypesSaga);
  yield fork(servicesSaga);
  yield fork(initialSaga);
  yield fork(langSaga);
  yield fork(priceSaga);
}

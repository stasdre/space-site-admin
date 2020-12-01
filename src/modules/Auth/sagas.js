import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { signin } from '../../api/auth';
import { authRequest, authSuccess, authFailure } from './actions.js';
import { showNotification } from '../Notification';

function* authWatcher() {
  yield takeLatest(authRequest, authFlow);
}

export function* authFlow(action) {
  const { email, password } = action.payload;
  const { accessToken, message } = yield call(signin, email, password);
  if (accessToken) {
    yield put(authSuccess(accessToken));
  } else {
    yield put(authFailure(message));
    yield put(showNotification({ type: 'error', content: message }));
  }
}

export default function* authFork() {
  yield fork(authWatcher);
}

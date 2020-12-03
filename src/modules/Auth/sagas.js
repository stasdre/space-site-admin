import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { signin } from '../../api/auth';
import { authRequest, authSuccess, authFailure } from './actions.js';
import { showNotification } from '../Notification';

function* authWatcher() {
  yield takeLatest(authRequest, authFlow);
}

export function* authFlow(action) {
  try {
    const { accessToken } = yield call(signin, action.payload);

    yield put(authSuccess(accessToken));
    yield put(
      showNotification({
        type: 'success',
        content: 'Welcome! :)',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(authFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export default function* authFork() {
  yield fork(authWatcher);
}

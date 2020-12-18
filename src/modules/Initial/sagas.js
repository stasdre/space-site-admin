import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { refreshInitial } from '../../api/auth';
import { getAll } from '../../api/lang';
import { initRequest, initSuccess, initFailure } from './actions.js';
import { showNotification } from '../Notification';
import { authSuccess } from '../Auth';
import { langGetAllSuccess } from '../Lang';

function* initialWatcher() {
  yield takeLatest(initRequest, initialFlow);
}

export function* initialFlow() {
  try {
    const { accessToken } = yield call(refreshInitial);

    const { data } = yield call(getAll);
    yield put(langGetAllSuccess(data));

    yield put(authSuccess(accessToken));
    yield put(initSuccess());
    yield put(
      showNotification({
        type: 'success',
        content: 'Welcome :)',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(initFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export default function* initialFork() {
  yield fork(initialWatcher);
}

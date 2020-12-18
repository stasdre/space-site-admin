import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { getAll } from '../../api/lang';
import { langGetAllRequest, langGetAllSuccess, langFailure } from './actions.js';
import { showNotification } from '../Notification';

function* langsWatcher() {
  yield takeLatest(langGetAllRequest, langsFlow);
}

export function* langsFlow() {
  try {
    const { data } = yield call(getAll);
    yield put(langGetAllSuccess(data));
  } catch (error) {
    const { data } = error;

    yield put(langFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export default function* langsFork() {
  yield fork(langsWatcher);
}

import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { create, getAll } from '../../api/work';
import {
  workCreateRequest,
  workCreateSuccess,
  workCreateFailure,
  workGetAllRequest,
  workGetAllSuccess,
  workGetAllFailure,
} from './actions.js';
import { showNotification } from '../Notification';

function* workWatcher() {
  yield takeLatest(workCreateRequest, workCreateFlow);
  yield takeLatest(workGetAllRequest, workGetAllFlow);
}

export function* workCreateFlow(action) {
  try {
    yield call(create, action.payload);
    yield put(workCreateSuccess());
    yield put(
      showNotification({
        type: 'success',
        content: 'Новая работа создана',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(workCreateFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export function* workGetAllFlow() {
  try {
    const { data } = yield call(getAll);
    yield put(workGetAllSuccess(data));
  } catch (error) {
    const { data } = error;

    yield put(workGetAllFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export default function* workFork() {
  yield fork(workWatcher);
}

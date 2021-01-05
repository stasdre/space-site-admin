import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { create, getAll, deleteWork } from '../../api/work';
import {
  workCreateRequest,
  workCreateSuccess,
  workCreateFailure,
  workGetAllRequest,
  workGetAllSuccess,
  workGetAllFailure,
  workDeleteRequest,
  workDeleteSuccess,
  workDeleteFailure,
} from './actions.js';
import { showNotification } from '../Notification';

function* workWatcher() {
  yield takeLatest(workCreateRequest, workCreateFlow);
  yield takeLatest(workGetAllRequest, workGetAllFlow);
  yield takeLatest(workDeleteRequest, workDeleteFlow);
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
    const { works } = yield call(getAll);
    yield put(workGetAllSuccess(works));
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

export function* workDeleteFlow(action) {
  try {
    const { work } = yield call(deleteWork, action.payload);
    yield put(workDeleteSuccess(work));
    yield put(
      showNotification({
        type: 'success',
        content: 'Работа удалена',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(workDeleteFailure());
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

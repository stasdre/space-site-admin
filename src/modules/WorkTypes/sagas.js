import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { getAll } from '../../api/workTypes';
import { workTypesRequest, workTypesSuccess, workTypesFailure } from './actions.js';
import { showNotification } from '../Notification';

function* typesWatcher() {
  yield takeLatest(workTypesRequest, typesGetFlow);
}

export function* typesGetFlow() {
  try {
    const { data } = yield call(getAll);
    yield put(workTypesSuccess(data));
  } catch (error) {
    const { data } = error;

    yield put(workTypesFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export default function* typesFork() {
  yield fork(typesWatcher);
}

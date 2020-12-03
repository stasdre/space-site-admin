import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { create } from '../../api/services';
import {
  seviceCreateRequest,
  seviceCreateSuccess,
  seviceCreateFailure,
} from './actions.js';
import { showNotification } from '../Notification';

function* servicesWatcher() {
  yield takeLatest(seviceCreateRequest, servicesCreateFlow);
}

export function* servicesCreateFlow(action) {
  try {
    yield call(create, action.payload);
    yield put(seviceCreateSuccess());
  } catch (error) {
    yield put(seviceCreateFailure());
    yield put(showNotification({ type: 'error', content: 'Что-то пошло не так (:' }));
  }
}

export default function* servicesFork() {
  yield fork(servicesWatcher);
}

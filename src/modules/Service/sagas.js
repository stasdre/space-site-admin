import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { create, getAll, deleteService } from '../../api/services';
import {
  seviceCreateRequest,
  seviceCreateSuccess,
  seviceCreateFailure,
  seviceGetAllRequest,
  seviceGetAllSuccess,
  seviceGetAllFailure,
  seviceDeleteRequest,
  seviceDeleteSuccess,
  seviceDeleteFailure,
} from './actions.js';
import { showNotification } from '../Notification';

function* servicesWatcher() {
  yield takeLatest(seviceCreateRequest, servicesCreateFlow);
  yield takeLatest(seviceGetAllRequest, servicesGetAllFlow);
  yield takeLatest(seviceDeleteRequest, servicesDeleteFlow);
}

export function* servicesCreateFlow(action) {
  try {
    yield call(create, action.payload);
    yield put(seviceCreateSuccess());
    yield put(
      showNotification({
        type: 'success',
        content: 'Новая услуга создана',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(seviceCreateFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export function* servicesGetAllFlow() {
  try {
    const { services } = yield call(getAll);
    yield put(seviceGetAllSuccess(services));
  } catch (error) {
    const { data } = error;

    yield put(seviceGetAllFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export function* servicesDeleteFlow(action) {
  try {
    const { service } = yield call(deleteService, action.payload);
    yield put(seviceDeleteSuccess(service));
    yield put(
      showNotification({
        type: 'success',
        content: 'Услуга удалена',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(seviceDeleteFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export default function* servicesFork() {
  yield fork(servicesWatcher);
}

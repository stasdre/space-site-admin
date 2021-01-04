import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { update, massUpdate } from '../../api/prices';
import {
  priceUpdateRequest,
  priceUpdateSuccess,
  priceUpdateFailure,
  priceMassUpdateRequest,
  priceMassUpdateSuccess,
  priceMassUpdateFailure,
} from './actions.js';
import { serviceUpdateRowPrice, serviceMassUpdatePrices } from '../Service';
import { showNotification } from '../Notification';

function* priceWatcher() {
  yield takeLatest(priceUpdateRequest, priceUpdateFlow);
  yield takeLatest(priceMassUpdateRequest, priceMassUpdateFlow);
}

export function* priceUpdateFlow(action) {
  try {
    const { price } = yield call(update, action.payload.id, action.payload.data);
    yield put(priceUpdateSuccess());
    yield put(serviceUpdateRowPrice(price));
    yield put(
      showNotification({
        type: 'success',
        content: 'Цена обновлена',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(priceUpdateFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export function* priceMassUpdateFlow(action) {
  try {
    const data = yield call(massUpdate, action.payload);
    yield put(serviceMassUpdatePrices(data));
    yield put(priceMassUpdateSuccess());
    yield put(
      showNotification({
        type: 'success',
        content: 'Цены обновлены',
      })
    );
  } catch (error) {
    const { data } = error;

    yield put(priceMassUpdateFailure());
    yield put(
      showNotification({
        type: 'error',
        content: data.message || 'Что-то пошло не так (:',
      })
    );
  }
}

export default function* priceFork() {
  yield fork(priceWatcher);
}

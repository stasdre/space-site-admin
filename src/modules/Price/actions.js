import { createAction } from 'redux-actions';

export const priceUpdateRequest = createAction('PRICE/UPDATE_REQUEST');
export const priceUpdateSuccess = createAction('PRICE/UPDATE_SUCCESS');
export const priceUpdateFailure = createAction('PRICE/UPDATE_FAILURE');

export const priceMassUpdateRequest = createAction('PRICE/UPDATE_MASS_REQUEST');
export const priceMassUpdateSuccess = createAction('PRICE/UPDATE_MASS_SUCCESS');
export const priceMassUpdateFailure = createAction('PRICE/UPDATE_MASS_FAILURE');

import { createAction } from 'redux-actions';

export const seviceCreateRequest = createAction('SERVICE/CREATE_REQUEST');
export const seviceCreateSuccess = createAction('SERVICE/CREATE_SUCCESS');
export const seviceCreateFailure = createAction('SERVICE/CREATE_FAILURE');

export const serviceUpdateIsSaved = createAction('SERVICE/UPDATE_IS_SAVED');

export const seviceGetAllRequest = createAction('SERVICE/GET_ALL_REQUEST');
export const seviceGetAllSuccess = createAction('SERVICE/GET_ALL_SUCCESS');
export const seviceGetAllFailure = createAction('SERVICE/GET_ALL_FAILURE');

export const seviceDeleteRequest = createAction('SERVICE/DELETE_REQUEST');
export const seviceDeleteSuccess = createAction('SERVICE/DELETE_SUCCESS');
export const seviceDeleteFailure = createAction('SERVICE/DELETE_FAILURE');

export const serviceUpdateRowPrice = createAction('SERVICE/UPDATE_ROW_PRICE');

export const serviceMassUpdatePrices = createAction('SERVICE/MASS_UPDATE_PRICES');

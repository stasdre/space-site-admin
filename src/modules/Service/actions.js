import { createAction } from 'redux-actions';

export const seviceCreateRequest = createAction('SERVICE/CREATE_REQUEST');
export const seviceCreateSuccess = createAction('SERVICE/CREATE_SUCCESS');
export const seviceCreateFailure = createAction('SERVICE/CREATE_FAILURE');

export const serviceUpdateIsSaved = createAction('SERVICE/UPDATE_IS_SAVED');

export const seviceGetAllRequest = createAction('SERVICE/GET_ALL_REQUEST');
export const seviceGetAllSuccess = createAction('SERVICE/GET_ALL_SUCCESS');
export const seviceGetAllFailure = createAction('SERVICE/GET_ALL_FAILURE');

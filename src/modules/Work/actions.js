import { createAction } from 'redux-actions';

export const workCreateRequest = createAction('WORK/CREATE_REQUEST');
export const workCreateSuccess = createAction('WORK/CREATE_SUCCESS');
export const workCreateFailure = createAction('WORK/CREATE_FAILURE');

export const workGetAllRequest = createAction('WORK/GET_ALL_REQUEST');
export const workGetAllSuccess = createAction('WORK/GET_ALL_SUCCESS');
export const workGetAllFailure = createAction('WORK/GET_ALL_FAILURE');

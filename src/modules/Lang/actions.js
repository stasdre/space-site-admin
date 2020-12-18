import { createAction } from 'redux-actions';

export const langGetAllRequest = createAction('LANG/GET_ALL_REQUEST');
export const langGetAllSuccess = createAction('LANG/GET_ALL_SUCCESS');
export const langFailure = createAction('LANG/FAILURE');

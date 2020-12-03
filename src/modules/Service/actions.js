import { createAction } from 'redux-actions';

export const seviceCreateRequest = createAction('SERVICE/CREATE_REQUEST');
export const seviceCreateSuccess = createAction('SERVICE/CREATE_SUCCESS');
export const seviceCreateFailure = createAction('SERVICE/CREATE_FAILURE');

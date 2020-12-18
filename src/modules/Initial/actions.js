import { createAction } from 'redux-actions';

export const initRequest = createAction('INIT/CREATE_REQUEST');
export const initSuccess = createAction('INIT/CREATE_SUCCESS');
export const initFailure = createAction('INIT/CREATE_FAILURE');

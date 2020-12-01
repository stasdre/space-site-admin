import { createAction } from 'redux-actions';

export const authRequest = createAction('AUTH/FEATCH_REQUEST');
export const authSuccess = createAction('AUTH/FEATCH_SUCCESS');
export const authFailure = createAction('AUTH/FEATCH_FAILURE');
export const logOut = createAction('AUTH/LOGOUT');

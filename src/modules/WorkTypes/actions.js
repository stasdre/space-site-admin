import { createAction } from 'redux-actions';

export const workTypesRequest = createAction('WORKTYPES/CREATE_REQUEST');
export const workTypesSuccess = createAction('WORKTYPES/CREATE_SUCCESS');
export const workTypesFailure = createAction('WORKTYPES/CREATE_FAILURE');

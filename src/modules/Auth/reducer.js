import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { authRequest, authSuccess, authFailure, logOut } from './actions';

const isAuthorized = handleActions(
  {
    [authSuccess]: () => true,
    [authFailure]: () => false,
    [logOut]: () => false,
  },
  false
);

const isLoading = handleActions(
  {
    [authRequest]: () => true,
    [authSuccess]: () => false,
    [authFailure]: () => false,
  },
  false
);

export default combineReducers({ isAuthorized, isLoading });

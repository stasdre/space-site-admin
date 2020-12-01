import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { authRequest, authSuccess, authFailure, logOut } from './actions';

const isAuthorized = handleActions(
  {
    [authSuccess]: () => true,
    [logOut]: () => false,
  },
  false
);

const accessToken = handleActions(
  {
    [authSuccess]: (_state, action) => action.payload,
    [authFailure]: () => '',
    [logOut]: () => '',
    [authRequest]: () => '',
  },
  ''
);

const isLoading = handleActions(
  {
    [authRequest]: () => true,
    [authSuccess]: () => false,
    [authFailure]: () => false,
  },
  false
);

const authError = handleActions(
  {
    [authRequest]: () => '',
    [authFailure]: (_state, action) => action.payload,
    [authSuccess]: () => '',
  },
  ''
);

export default combineReducers({ isAuthorized, accessToken, isLoading, authError });

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { initRequest, initSuccess, initFailure } from './actions';

const isLoading = handleActions(
  {
    [initRequest]: () => true,
    [initSuccess]: () => false,
    [initFailure]: () => false,
  },
  false
);

export default combineReducers({ isLoading });

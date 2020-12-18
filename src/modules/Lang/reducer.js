import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { langGetAllRequest, langGetAllSuccess, langFailure } from './actions';

const langs = handleActions(
  {
    [langGetAllRequest]: () => [],
    [langGetAllSuccess]: (_state, action) => action.payload,
    [langFailure]: () => [],
  },
  []
);

const isLoading = handleActions(
  {
    [langGetAllRequest]: () => true,
    [langGetAllSuccess]: () => false,
    [langFailure]: () => false,
  },
  false
);

export default combineReducers({ langs, isLoading });

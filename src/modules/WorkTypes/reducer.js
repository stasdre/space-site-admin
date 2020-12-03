import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { workTypesRequest, workTypesSuccess, workTypesFailure } from './actions';

const types = handleActions(
  {
    [workTypesRequest]: () => [],
    [workTypesSuccess]: (_state, action) => [...action.payload],
    [workTypesFailure]: () => [],
  },
  []
);

const isLoading = handleActions(
  {
    [workTypesRequest]: () => true,
    [workTypesSuccess]: () => false,
    [workTypesFailure]: () => false,
  },
  false
);

export default combineReducers({ types, isLoading });

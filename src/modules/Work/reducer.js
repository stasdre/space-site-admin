import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  workCreateRequest,
  workCreateSuccess,
  workCreateFailure,
  workGetAllRequest,
  workGetAllSuccess,
  workGetAllFailure,
} from './actions';

const works = handleActions(
  {
    [workGetAllRequest]: () => [],
    [workGetAllSuccess]: (_state, action) =>
      action.payload.map((work) => ({ ...work, title: work.name, key: work.id })),
    [workGetAllFailure]: () => [],
  },
  []
);

const isLoading = handleActions(
  {
    [workCreateRequest]: () => true,
    [workGetAllRequest]: () => true,
    [workCreateSuccess]: () => false,
    [workGetAllSuccess]: () => false,
    [workCreateFailure]: () => false,
    [workGetAllFailure]: () => false,
  },
  false
);

export default combineReducers({ works, isLoading });

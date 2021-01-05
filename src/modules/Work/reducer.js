import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  workCreateRequest,
  workCreateSuccess,
  workCreateFailure,
  workGetAllRequest,
  workGetAllSuccess,
  workGetAllFailure,
  workUpdateIsSaved,
  workDeleteRequest,
  workDeleteSuccess,
  workDeleteFailure,
} from './actions';

const works = handleActions(
  {
    [workGetAllRequest]: () => {},
    [workGetAllSuccess]: (_state, action) => action.payload,
    [workGetAllFailure]: () => {},
    [workDeleteSuccess]: (_state, action) => {
      const newState = {};
      for (const item in _state) {
        newState[item] = _state[item].filter(
          (work) => work.id !== action.payload && work
        );
      }

      return newState;
    },
  },
  {}
);

const isLoading = handleActions(
  {
    [workCreateRequest]: () => true,
    [workGetAllRequest]: () => true,
    [workCreateSuccess]: () => false,
    [workGetAllSuccess]: () => false,
    [workCreateFailure]: () => false,
    [workGetAllFailure]: () => false,

    [workDeleteRequest]: () => true,
    [workDeleteSuccess]: () => false,
    [workDeleteFailure]: () => false,
  },
  false
);

const isSaved = handleActions(
  {
    [workCreateSuccess]: () => true,
    [workCreateFailure]: () => false,
    [workUpdateIsSaved]: () => false,
  },
  false
);

export default combineReducers({ works, isLoading, isSaved });

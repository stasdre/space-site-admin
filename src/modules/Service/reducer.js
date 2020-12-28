import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  seviceCreateRequest,
  seviceCreateSuccess,
  seviceCreateFailure,
  serviceUpdateIsSaved,
  seviceGetAllRequest,
  seviceGetAllSuccess,
  seviceGetAllFailure,
} from './actions';

const services = handleActions(
  {
    [seviceGetAllRequest]: () => [],
    [seviceGetAllSuccess]: (_state, action) => action.payload,
    [seviceGetAllFailure]: () => [],
  },
  []
);

const isLoading = handleActions(
  {
    [seviceCreateRequest]: () => true,
    [seviceCreateSuccess]: () => false,
    [seviceCreateFailure]: () => false,
  },
  false
);

const isSaved = handleActions(
  {
    [seviceCreateSuccess]: () => true,
    [seviceCreateFailure]: () => false,
    [serviceUpdateIsSaved]: () => false,
  },
  false
);

export default combineReducers({ services, isLoading, isSaved });

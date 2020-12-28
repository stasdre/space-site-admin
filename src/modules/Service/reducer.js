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
  seviceDeleteRequest,
  seviceDeleteSuccess,
  seviceDeleteFailure,
} from './actions';

const services = handleActions(
  {
    [seviceGetAllRequest]: () => [],
    [seviceGetAllSuccess]: (_state, action) => action.payload,
    [seviceGetAllFailure]: () => [],
    [seviceDeleteSuccess]: (_state, action) => {
      const newState = {};
      for (const item in _state) {
        newState[item] = _state[item].filter(
          (service) => service.id !== action.payload && service
        );
      }

      return newState;
    },
  },
  []
);

const isLoading = handleActions(
  {
    [seviceCreateRequest]: () => true,
    [seviceCreateSuccess]: () => false,
    [seviceCreateFailure]: () => false,

    [seviceGetAllRequest]: () => true,
    [seviceGetAllSuccess]: () => false,
    [seviceGetAllFailure]: () => false,

    [seviceDeleteRequest]: () => true,
    [seviceDeleteSuccess]: () => false,
    [seviceDeleteFailure]: () => false,
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

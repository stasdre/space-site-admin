import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { seviceCreateRequest, seviceCreateSuccess, seviceCreateFailure } from './actions';

const services = handleActions({}, []);

const isLoading = handleActions(
  {
    [seviceCreateRequest]: () => true,
    [seviceCreateSuccess]: () => false,
    [seviceCreateFailure]: () => false,
  },
  false
);

export default combineReducers({ services, isLoading });

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  priceUpdateRequest,
  priceUpdateSuccess,
  priceUpdateFailure,
  priceMassUpdateRequest,
  priceMassUpdateFailure,
  priceMassUpdateSuccess,
} from './actions';

const isLoading = handleActions(
  {
    [priceUpdateRequest]: () => true,
    [priceUpdateSuccess]: () => false,
    [priceUpdateFailure]: () => false,
  },
  false
);

const isLoadingMass = handleActions(
  {
    [priceMassUpdateRequest]: () => true,
    [priceMassUpdateFailure]: () => false,
    [priceMassUpdateSuccess]: () => false,
  },
  false
);

export default combineReducers({ isLoading, isLoadingMass });

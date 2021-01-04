import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import produce from 'immer';
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
  serviceUpdateRowPrice,
  serviceMassUpdatePrices,
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
    [serviceUpdateRowPrice]: (_state, action) => {
      const lang = action.payload.LangId;

      const newState = produce(_state, (draft) => {
        draft[lang].forEach((element, index) => {
          if (element['id'] === action.payload.ServiceId) {
            draft[lang][index][action.payload.column] = action.payload;
            element.prices.forEach((price, indexPrice) => {
              if (price.id === action.payload.id) {
                draft[lang][index]['prices'][indexPrice] = action.payload;
              }
            });
          }
        });
      });

      return newState;
    },
    [serviceMassUpdatePrices]: (_state, action) => {
      const lang = action.payload.lang;
      const prices = action.payload.prices;

      const newState = produce(_state, (draft) => {
        draft[lang].forEach((element, index) => {
          if (prices[element.id]) {
            delete draft[lang][index]['column_1'];
            delete draft[lang][index]['column_2'];
            delete draft[lang][index]['column_3'];
            delete draft[lang][index]['prices'];
            draft[lang][index] = { ...draft[lang][index], ...prices[element.id] };
          }
        });
      });

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

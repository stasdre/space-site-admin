import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { showNotification, clearNotification } from './actions';

const content = handleActions(
  {
    [showNotification]: (_state, action) => action.payload.content,
    [clearNotification]: () => '',
  },
  ''
);

const type = handleActions(
  {
    [showNotification]: (_state, action) => action.payload.type || 'info',
    [clearNotification]: () => '',
  },
  'info'
);

const delay = handleActions(
  {
    [showNotification]: (_state, action) => action.payload.delay || 2,
    [clearNotification]: () => '',
  },
  2
);

export default combineReducers({ content, type, delay });

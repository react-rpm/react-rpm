import * as ActionTypes from '../actions/types';
import { combineReducers } from 'redux';

function perfs(state = { wasted: [], dom: [], inclusive: [], exclusive: [] }, action) {
  const { type } = action;

  switch (type) {
    case ActionTypes.GET_PERF_DATA_SUCCESS:
      return action.response;
    case ActionTypes.START_RECORD_SUCCESS:
      return { wasted: [], dom: [], inclusive: [], exclusive: [] };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  perfs,
});

export default rootReducer;

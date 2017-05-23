import * as ActionTypes from './types';

export function getPerfData() {
  return {
      [PERF_ACTION]: {
        types: [
          ActionTypes.GET_PERF_DATA_REQUEST,
          ActionTypes.GET_PERF_DATA_SUCCESS,
          ActionTypes.GET_PERF_DATA_FAILURE
        ]
      }
  };
}

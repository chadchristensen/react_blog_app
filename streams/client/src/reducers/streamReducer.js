import {
  FETCH_ALL_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

import _omit from 'lodash.omit';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_STREAMS:
      const fetchedStreamsAsObject = action.payload.reduce(
        (allStreams, stream) => {
          allStreams[stream.id] = stream;
          return allStreams
        }
      , {});
      return { ...state, ...fetchedStreamsAsObject}
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _omit(state, action.payload);
    default:
      return state;
  }
}
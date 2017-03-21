import { combineReducers } from 'redux';
import {
  WATERBOATS_FETCH_SUCCESS,
  WATERBOATS_FETCH_REQUEST
} from '../constants/ActionTypes';

const waterboats = (state = {}, action) => {
  switch (action.type) {
    case WATERBOATS_FETCH_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  waterboats
});
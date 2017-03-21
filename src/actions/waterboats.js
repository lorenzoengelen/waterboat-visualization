import waterboats from '../api/waterboats';
import * as types from '../constants/ActionTypes';

const receiveWaterboats = waterboats => ({
  type: types.WATERBOATS_FETCH_SUCCESS,
  payload: waterboats
});

export const fetchWaterboats = () => dispatch => {
  waterboats.getWaterboats(waterboats => {
    dispatch(receiveWaterboats(waterboats));
  });
};
import waterboats from '../api/waterboats';
import * as types from '../constants/ActionTypes';

const receiveWaterboats = waterboats => ({
  type: types.WATERBOATS_FETCH_SUCCESS,
  waterboats
});

export const fetchWaterboats = () => dispatch => {
  waterboats.getWaterboats(waterboats => {
    dispatch(receiveWaterboat(waterboats));
  });
};

// export const setCategory = category => ({
//   type: types.CATALOG_SET_CATEGORY,
//   category
// });
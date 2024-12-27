import { GET_HOT_CHART } from "store/actionTypes";

const initialState = {
  chartSongs: {},
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOT_CHART:
      return {
        ...state,
        chartSongs: action.payload.tracks,
      };
    default:
      return state;
  }
};

export default chartReducer;

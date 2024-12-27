import { GET_FAVOURITES } from "store/actionTypes";

const initialState = {
  favouriteSongs: {},
};

const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVOURITES:
      return {
        ...state,
        favouriteSongs: action.payload,
      };
    default:
      return state;
  }
};

export default favouriteReducer;

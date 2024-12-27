import { GET_RECENT } from "store/actionTypes";

const initialState = {
  recentUploads: {},
};

const recentUploadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECENT:
      return {
        ...state,
        recentUploads: action.payload,
      };
    default:
      return state;
  }
};

export default recentUploadsReducer;

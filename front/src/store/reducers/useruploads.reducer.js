import { GET_UPLOADS } from "store/actionTypes";

const initialState = {
  userUploads: {},
};

const useruploadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UPLOADS:
      return {
        ...state,
        userUploads: action.payload,
      };
    default:
      return state;
  }
};

export default useruploadsReducer;

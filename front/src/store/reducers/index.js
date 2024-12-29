import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import playerReducer from "./player.reducer";
import userContentReducer from "./userContent.reducer";
import exploreReducer from "./explore.reducer";

export default combineReducers({
  auth: authReducer,
  player: playerReducer,
  userContent: userContentReducer,
  explore: exploreReducer,
});

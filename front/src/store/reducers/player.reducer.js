import {
  PLAY_SONG,
  PAUSE_SONG,
  STOP_SONG,
  UPDATE_TIME,
  SET_DURATION,
  RESUME_SONG,
} from "../actionTypes";

const initialState = {
  playerState: "stopped", // 'playing', 'paused', 'stopped'
  currentSong: null,
  trackInfo: null,
  currentTime: 0,
  trackDuration: 0,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        playerState: "playing",
        currentSong: action.payload.preview,
        trackInfo: action.payload.track,
        currentTime: 0,
      };

    case PAUSE_SONG:
      return {
        ...state,
        playerState: "paused",
      };

    case STOP_SONG:
      return {
        ...state,
        playerState: "stopped",
        currentSong: null,
        currentTime: 0,
      };

    case UPDATE_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };

    case SET_DURATION:
      return {
        ...state,
        trackDuration: action.payload,
      };

    default:
      return state;
  }
};

export default playerReducer;

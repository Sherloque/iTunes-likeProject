import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerState: "stopped", // 'playing', 'paused', 'stopped'
  currentSong: null,
  trackInfo: null,
  currentTime: 0,
  trackDuration: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong(state, action) {
      console.log(action);
      state.playerState = "playing";
      state.currentSong = action.payload.preview;
      state.trackInfo = action.payload.track;
      state.currentTime = 0;
    },
    pauseSong(state) {
      state.playerState = "paused";
    },
    stopSong(state) {
      state.playerState = "stopped";
      state.currentSong = null;
      state.currentTime = 0;
    },
    updateTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.trackDuration = action.payload;
    },
    resumeSong(state) {
      if (state.playerState === "paused") {
        state.playerState = "playing";
      }
    },
  },
});

export const {
  playSong,
  pauseSong,
  stopSong,
  updateTime,
  setDuration,
  resumeSong,
} = playerSlice.actions;

export default playerSlice.reducer;

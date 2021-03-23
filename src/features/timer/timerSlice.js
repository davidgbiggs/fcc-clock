import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    isPaused: true,
    breakLength: 300,
    sessionLength: 1500,
  },
  reducers: {
    play: (state) => {
      state.isPaused = false;
    },
    pause: (state) => {
      state.isPaused = true;
    },
    incrementBreakLength: (state) => {
      if (state.breakLength !== 3600 && state.isPaused) {
        state.breakLength += 60;
      }
    },
    decrementBreakLength: (state) => {
      if (state.breakLength !== 60 && state.isPaused) {
        state.breakLength -= 60;
      }
    },
    incrementSessionLength: (state) => {
      if (state.sessionLength !== 3600 && state.isPaused) {
        state.sessionLength += 60;
      }
    },
    decrementSessionLength: (state) => {
      if (state.sessionLength !== 60 && state.isPaused) {
        state.sessionLength -= 60;
      }
    },
    setSessionLength: (state, action) => {
      state.sessionLength = action.payload;
    },
    setBreakLength: (state, action) => {
      state.breakLength = action.payload;
    },
  },
});

export const {
  play,
  pause,
  incrementBreakLength,
  decrementBreakLength,
  incrementSessionLength,
  decrementSessionLength,
  setSessionLength,
  setBreakLength,
} = timerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsPaused = (state) => state.timer.isPaused;
export const selectSessionLength = (state) => state.timer.sessionLength;
export const selectBreakLength = (state) => state.timer.breakLength;

export default timerSlice.reducer;

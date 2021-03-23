import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementBreakLength,
  decrementBreakLength,
  incrementSessionLength,
  decrementSessionLength,
  selectSessionLength,
  selectBreakLength,
} from "./timerSlice";

export default function SettingsBox() {
  const breakLength = useSelector(selectBreakLength);
  const sessionLength = useSelector(selectSessionLength);
  const dispatch = useDispatch();

  return (
    <>
      <div className="settings-box d-flex">
        <div className="break-controls p-3 d-flex flex-column align-items-center">
          <div id="break-label">Break Length</div>
          <div className="controls-container d-flex align-items-center">
            <button
              onClick={() => dispatch(decrementBreakLength())}
              className="btn btn-link"
              id="break-decrement"
            >
              <i className="fas fa-angle-down"></i>
            </button>
            <span id="break-length">{breakLength / 60}</span>
            <button
              onClick={() => dispatch(incrementBreakLength())}
              className="btn btn-link"
              id="break-increment"
            >
              <i className="fas fa-angle-up"></i>
            </button>
          </div>
        </div>
        <div className="session-controls p-3 d-flex align-items-center flex-column">
          <div id="session-label">Session Length</div>
          <div className="controls-container d-flex align-items-center">
            <button
              onClick={() => dispatch(decrementSessionLength())}
              className="btn btn-link"
              id="session-decrement"
            >
              <i className="fas fa-angle-down"></i>
            </button>
            <span id="session-length">{sessionLength / 60}</span>
            <button
              onClick={() => dispatch(incrementSessionLength())}
              className="btn btn-link"
              id="session-increment"
            >
              <i className="fas fa-angle-up"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

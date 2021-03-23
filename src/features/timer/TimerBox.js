import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSessionLength,
  selectBreakLength,
  setSessionLength,
  setBreakLength,
} from "./timerSlice";
import { selectIsPaused, play, pause } from "./timerSlice";
import useInterval from "../../useInterval";
import alarmSound from "../../alarm.mp3";
import moment from "moment";

export default function TimerBox() {
  // start, session, break
  const [stage, setStage] = useState("Session");
  const sessionLength = useSelector(selectSessionLength);
  const breakLength = useSelector(selectBreakLength);
  const [timeRemaining, setTimeRemaining] = useState(sessionLength);
  const isPaused = useSelector(selectIsPaused);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeRemaining(sessionLength);
  }, [sessionLength]);

  useInterval(
    () => {
      if (timeRemaining >= 1) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        playBeep();
        if (stage === "Session") {
          setStage("Break");
          setTimeRemaining(breakLength);
        } else {
          setStage("Session");
          setTimeRemaining(sessionLength);
        }
      }
    },
    isPaused ? null : 1000
  );

  function playBeep() {
    document.querySelector("#beep").play();
  }

  function toggleTimer() {
    if (isPaused) {
      dispatch(play());
    } else {
      dispatch(pause());
    }
  }

  function reset() {
    dispatch(pause());
    setStage("Session");
    document.querySelector("#beep").pause();
    document.querySelector("#beep").currentTime = 0;
    dispatch(setSessionLength(1500));
    dispatch(setBreakLength(300));
    setTimeRemaining(1500);
  }

  function formattedTime() {
    if (timeRemaining === 3600) {
      return "60:00";
    } else {
      return moment(
        moment.duration(timeRemaining * 1000, "milliseconds").asMilliseconds()
      ).format("mm:ss");
    }
  }

  return (
    <>
      <div className="timer-box d-flex flex-column align-items-center">
        <span id="timer-label">{stage}</span>
        <span id="time-left">{formattedTime()}</span>
      </div>
      <div id="controls-container d-flex flex-column align-items-center">
        <button className="btn btn-link" onClick={toggleTimer} id="start_stop">
          {isPaused ? (
            <i className="fas fa-play"></i>
          ) : (
            <i className="fas fa-pause"></i>
          )}
        </button>
        <button onClick={reset} className="btn btn-link" id="reset">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <audio src={alarmSound} id="beep"></audio>
    </>
  );
}

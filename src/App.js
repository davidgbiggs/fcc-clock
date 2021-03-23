import React from "react";
import "./App.scss";
import SettingsBox from "./features/timer/SettingsBox";
import TimerBox from "./features/timer/TimerBox";

function App() {
  return (
    <div className="App d-flex align-items-center justify-content-center flex-column">
      <h1>25 + 5 Clock</h1>
      <SettingsBox />
      <TimerBox />
    </div>
  );
}

export default App;

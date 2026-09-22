import React, { createContext, useContext, useEffect, useState } from "react";
import { AppGlobal, useGlobalState } from "./GlobalState";
import "./styles.css";

const timerStream = (() => {
  let elapsed = 0;
  let listeners = new Set();

  setInterval(() => {
    elapsed++;
    listeners.forEach((listener) => listener(elapsed));
  }, 1000);

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      listener(elapsed);
      return () => listeners.delete(listener);
    }
  };
})();

const TimerContext = createContext();

function DoNotCare() {
  console.log(`I better not rerender: ${Date.now()}`);
  return (
    <div>Please check the console and make sure I don't rerender, kare</div>
  );
}

function Time() {
  const stream = useContext(TimerContext);
  const [elapsed, setElapsed] = useState("--");

  useEffect(() => {
    return stream.subscribe(setElapsed);
  }, [stream]);

  return <strong>{elapsed} seconds</strong>;
}

function SomeWrappedTime() {
  return (
    <div style={{ border: "2px solid blue", padding: "1rem", margin: "1rem" }}>
      <Time />
    </div>
  );
}

export default function App() {
  const [tenant] = useGlobalState("tenant");

  return (
    <TimerContext.Provider value={timerStream}>
      <div className="App">
        <h2>Open the console!</h2>
        {tenant.name}
        <DoNotCare />
        <br />
        <Time />
        <hr />
        <SomeWrappedTime />
        <strong>
          <Time />
        </strong>
      </div>
      <AppGlobal />
    </TimerContext.Provider>
  );
}

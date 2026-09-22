import React from "react";
import { createStore, useStore } from "./store";
import "./styles.css";

const store = createStore({
  value1: 0,
  value2: 0,
});

const DisplayValue = ({ item }) => (
  <div>
    {item}: {useStore(store, (state) => state[item])}
  </div>
);

const IncrementValue = ({ item }) => (
  <button
    onClick={() => {
      const state = store.getState();
      store.setState({
        ...state,
        [item]: state[item] + 1,
      });
    }}
  >
    Increment {item}
  </button>
);

const App = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: 600,
        gap: "1rem",
      }}
    >
      <IncrementValue item="value1" />
      <DisplayValue item="value1" />
      <IncrementValue item="value2" />
      <DisplayValue item="value2" />
    </div>
  );
};

export default App;

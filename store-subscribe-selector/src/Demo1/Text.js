import React, { useEffect } from "react";
import { createStore } from "../store";
import TextInformation from "./TextInformation";
import "../styles.css";

export const storeText = createStore({ text: "", colour: "bgpo" });
const { getState, setState } = storeText;

export default function Text() {
  useEffect(() => {
    setState({ ...getState(), text: "initial state" });
  }, []);

  return (
    <div className="wrapper">
      <label htmlFor="text">
        Add Your Text Here:
        <input
          id="text"
          name="text"
          onChange={(e) => {
            setState({ ...getState(), text: e.target.value });
          }}
        ></input>
      </label>
      <TextInformation />
    </div>
  );
}

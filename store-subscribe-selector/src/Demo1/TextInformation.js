import React from "react";
import { storeText } from "./Text";
import { useStore } from "../store";

export default function TextInformation() {
  const { text, colour } = useStore(storeText, (state) => state);
  return (
    <>
      <div>Colour: {colour}</div>
      <div>Text: {text}</div>
    </>
  );
}

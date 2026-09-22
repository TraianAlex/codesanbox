import { createContext, useState } from "react";
import TextInformation from "./TextInformation/TextInformation";
import "./styles.css";

export const TextContext = createContext("");
TextContext.displayName = "TextContext";

export default function App() {
  const [text, setText] = useState("");

  return (
    <TextContext value={text}>
      <div className="wrapper">
        <label htmlFor="text">
          Add Your Text Here:
          <textarea
            id="text"
            name="text"
            rows="10"
            cols="100"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <TextInformation />
      </div>
    </TextContext>
  );
}

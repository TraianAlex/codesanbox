import { useContext } from "react";
import { TextContext } from "../App";

export default function WordCount({ show }) {
  const text = useContext(TextContext);

  if (!show) {
    return null;
  }

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return <div>Word Count: {wordCount}</div>;
}

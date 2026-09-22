import { useContext } from "react";
import { TextContext } from "../App";

function itemize(text) {
  const letters = text
    .split("")
    .filter((l) => l !== " ")
    .reduce((collection, item) => {
      const letter = item.toLowerCase();
      return {
        ...collection,
        [letter]: (collection[letter] || 0) + 1,
      };
    }, {});
  return Object.entries(letters).sort((a, b) => b[1] - a[1]);
}

export default function CharacterMap({ show }) {
  const text = useContext(TextContext);

  if (!show) {
    return null;
  }

  return (
    <div>
      Character Map:
      {itemize(text).map(([character, count]) => (
        <div key={character}>
          {character}: {count}
        </div>
      ))}
    </div>
  );
}

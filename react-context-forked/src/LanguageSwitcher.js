import { useContext } from "react";

import LanguageContext from "./language-context";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <button onClick={() => setLanguage("jp")}>
      Switch Language (Current: {language})
    </button>
  );
};

export default LanguageSwitcher;

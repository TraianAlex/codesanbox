import { createContext } from "react";

// set the defaults
const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {}
});

export default LanguageContext;

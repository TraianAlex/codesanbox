import { useState } from "react";
import { createRoot } from "react-dom/client";

import LanguageContext from "./language-context";
import LanguageSwitcher from "./LanguageSwitcher";

const App = () => {
  const [language, setLanguage] = useState("en");
  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      <h2>Current Language: {language}</h2>
      <p>Click button to change to jp</p>
      <div>
        {/* Can be nested */}
        <LanguageSwitcher />
      </div>
    </LanguageContext.Provider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

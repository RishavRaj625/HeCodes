import { createContext, useContext, useMemo, useState } from "react";
import { messages } from "./locales";
const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("neuroaid_language") || "en-IN");
  const value = useMemo(() => ({ language, setLanguage: code => { localStorage.setItem("neuroaid_language", code); setLanguage(code); }, t: (key, vars = {}) => (messages[language]?.[key] || messages["en-IN"][key] || key).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "") }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export const useI18n = () => useContext(LanguageContext);

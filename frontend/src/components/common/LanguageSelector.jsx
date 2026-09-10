import { useI18n } from "../../i18n/LanguageContext";
import { messages } from "../../i18n/locales";
export default function LanguageSelector() { const { language, setLanguage } = useI18n(); return <select aria-label="Language" value={language} onChange={e => setLanguage(e.target.value)} style={{ borderRadius:8, padding:6 }} >{Object.keys(messages).map(code => <option key={code} value={code}>{messages[code].language}</option>)}</select>; }

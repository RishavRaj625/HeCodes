export function speak(text, language) {
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = language; window.speechSynthesis.speak(utterance); return true;
}
export function listen(language, onText, onUnavailable) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { onUnavailable?.(); return null; }
  const recognition = new Recognition(); recognition.lang = language; recognition.interimResults = false; recognition.maxAlternatives = 1;
  recognition.onresult = event => onText(event.results[0][0].transcript); recognition.onerror = () => onUnavailable?.(); recognition.start(); return recognition;
}
export function detectIntent(text) {
  const value = text.toLowerCase();
  if (/start|play|खेल|शুরু/.test(value)) return { type:"START_GAME", text:value };
  if (/repeat|again|दोहर|আকৌ/.test(value)) return { type:"REPEAT_INSTRUCTION" };
  if (/water|hydration|पानी|পানী/.test(value)) return { type:"HYDRATION" };
  if (/done|complete|taken|पूरा|সম্পূৰ্ণ/.test(value)) return { type:"REMINDER_ACK" };
  if (/routine|schedule|दिनचर्या|ৰুটিন/.test(value)) return { type:"ROUTINE" };
  return { type:"OBJECT_ANSWER", answer:value };
}

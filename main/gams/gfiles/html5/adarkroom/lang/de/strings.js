/* Object containing translations */
const translations = {
  /* Key-value pairs of phrases and their translations */
  "the plague is kept from spreading.": "die seuche konnte sich nicht ausbreiten.",
  "all": "Alle",
  "use meds": "medizin benutzen",
  "water tank": "wassertank",
  /* ... more translations ... */
};

/* Function to get a translation */
function getTranslation(phrase) {
  return translations[phrase] || phrase; // return the translation or the original phrase if no translation exists
}

/* Example usage */
console.log(getTranslation("the plague is kept from spreading.")); // outputs: die seuche konnte sich nicht ausbreiten.
console.log(getTranslation("unknown phrase")); // outputs: unknown phrase

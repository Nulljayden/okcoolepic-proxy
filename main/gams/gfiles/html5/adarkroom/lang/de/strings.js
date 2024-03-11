// Object containing translations
const translations = {
  // Key-value pairs of phrases and their translations
  "the plague is kept from spreading.": "die seuche konnte sich nicht ausbreiten.",
  "all": "Alle",
  "use meds": "medizin benutzen",
  "water tank": "wassertank",
  /* ... more translations ... */
};

/*
 * Function to get a translation
 * Parameters:
 *   phrase: string - The phrase to be translated
 * Returns:
 *   The translated phrase or the original phrase if no translation exists
 */
function getTranslation(phrase) {
  // Return the translation or the original phrase if no translation exists
  return translations[phrase] || phrase;
}

/*
 * Example usage
 * Logs the translated phrase to the console
 */
console.log(getTranslation("the plague is kept from spreading.")); // outputs: die seuche konnte sich nicht ausbreiten.

/*
 * Example usage
 * Logs the original phrase to the console if no translation exists
 */
console.log(getTranslation("unknown phrase")); // outputs: unknown phrase

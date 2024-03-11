(function() {
  // Define the date and number formats
  const dateFormats = {
    SHORT_PADDED_CENTURY: d => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`,
    SHORT: d => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`,
    SHORT_NOYEAR: d => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`,
    SHORT_NODAY: d => `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`,
    MEDIUM: d => `${d.getDate()} ${dateFormatSymbols.month_short[d.getMonth()]} ${d.getFullYear()}`,
    MEDIUM_NOYEAR: d => `${d.getDate()} ${dateFormatSymbols.month_short[d.getMonth()]}`,
    MEDIUM_WEEKDAY_NOYEAR: d => `${dateFormatSymbols.day_short[d.getDay()]} ${d.getDate()} ${dateFormatSymbols.month_short[d.getMonth()]}`,
    LONG_NODAY: d => `${dateFormatSymbols.month_name[d.getMonth()]} ${d.getFullYear()}`,
    LONG: d => `${d.getDate()} ${dateFormatSymbols.month_name[d.getMonth()]} ${d.getFullYear()}`,
    FULL: d => `${dateFormatSymbols.day_name[d.getDay()]} ${d.getDate()} ${dateFormatSymbols.month_name[d.getMonth()]} ${d.getFullYear()}`,
  };
  const numberFormatSymbols = {
    decimal_separator: ',',
    grouping_separator: ' ',
    minus: '-',
  };
  const dateFormatSymbols = {
    am_pm: ['AM', 'PM'],
    day_name: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    day_short: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    era: ['av. J.-C.', 'ap. J.-C.'],
    era_name: ['avant Jésus-Christ', 'après Jésus-Christ'],
    month_name: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    month_short: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
    order_full: 'DMY',
    order_long: 'DMY',
    order_medium: 'DMY',
    order_short: 'DMY',
  };

  // Freeze the format objects to prevent modification
  Object.freeze(dateFormats);
  Object.freeze(numberFormatSymbols);
  Object.freeze(dateFormatSymbols);

  // Define the ICU object
  const icu = {
    getCountry() { return ''; },
    getCountryName() { return ''; },
    getDateFormat(formatCode) {
      if (!formatCode || !dateFormats[formatCode]) {
        throw new Error(`Invalid date format code: ${formatCode}`);
      }
      return { format: dateFormats[formatCode] };
    },
    getDateFormats() { return dateFormats; },
    getDateFormatSymbols() { return dateFormatSymbols; },
    getDecimalFormat(places) {
      if (!places || typeof places !== 'number') {
        throw new Error(`Invalid number of decimal places: ${places}`);
      }
      return {
        format: n => {
          const abs = Math.abs(n);
          const int = abs.toString().split('.')[0];
          const dec = abs.toString().split('.')[1] || '';
          const intParts = int.split('').reverse().map((digit, i) => i % 3 === 0 && i !== 0 ? `${digit}${numberFormatSymbols.grouping

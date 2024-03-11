/**
 * Game settings module
 * @module GameSettings
 */

const autoSaveMapping = {
  '30secs': 30 * 1000,
  '2mins': 2 * 60 * 1000,
  '10mins': 10 * 60 * 1000,
  'off': 10000000000000000000
};

const gameSettings = {
  dataVersion: 1,
  entries: {
    formatter: 'shortName',
    boldEnabled: false,
    sidebarCompressed: false,
    notificationsEnabled: true,
    saveNotifsEnabled: true,
    gainButtonsHidden: false,
    redDestroyButtons: false,
    hideCompleted: false,
    theme: 'base',
    autoSaveInterval: 30 * 1000
  },
  elementCache: {},
  reapplyTheme: true
};

/**
 * Formats a value based on the current formatter
 * @param {number} value - The value to format
 * @param {number} digit - The number of decimal places
 * @returns {string} The formatted value
 */
gameSettings.format = function(value, digit) {
  const format = this.entries.formatter || 'shortName';
  return Game.utils.formatters[format](value.toFixed(digit || 0));
};

/**
 * Gets an element from the cache or the DOM
 * @param {string} id - The ID of the element
 * @returns {jQuery} The jQuery object of the element
 */
gameSettings.getEl = function(id) {
  let element = this.elementCache[id];
  if (!element) {
    element = $('#' + id);
    if (element.length > 0) {
      this.elementCache[id] = element;
    }
  }
  return element;
};

/**
 * Turns an element red and bold if its value is negative
 * @param {number} value - The value to check
 * @param {string} id - The ID of the element
 * @returns {boolean} True if the element was turned red and bold, false otherwise
 */
gameSettings.turnRedOnNegative = function(value, id) {
  const element = this.getEl(id);
  if (element.length === 0) {
    console.error(`Element not found: ${id}`);
    return false;
  }

  if (value < 0) {
    if (this.entries.boldEnabled) {
      element.addClass('red bold');
    } else {
      element.addClass('red');
      element.removeClass('bold');
    }
    return true;
  } else {
    element.removeClass('red bold');
    return false;
  }
};

// ... other functions

/**
 * Exports the gameSettings object
 * @type {Object}
 */
module.exports = gameSettings;

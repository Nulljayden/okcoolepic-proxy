// localStorage helper functions
function setLocalStorageObject(key, value) {
  // This function sets a localStorage item with a given key and a JSON-stringified value.
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorageObject(key) {
  // This function retrieves a localStorage item with a given key and parses it as a JSON object.
  // If the item does not exist, it returns null.
  var value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

function removeLocalStorageObject(key) {
  // This function removes a localStorage item with a given key.
  localStorage.removeItem(key);
}

// JQuery setup function for storing and retrieving game data
$.setupStorage = function() {
  // This function sets up the storage object using data from localStorage or defaults.
  $.storage = getLocalStorageObject('radiusraid') || {
    'mute': 0, // Mute status (0: off, 1: on)
    'autofire': 0, // Autofire status (0: off, 1: on)
    'score': 0, // Player's score
    'level': 0, // Player's level
    'rounds': 0, // Number of completed rounds
    'kills': 0, // Number of enemy kills
    'bullets': 0, // Number of bullets fired
    'powerups': 0, // Number of powerups collected
    'time': 0 // Gameplay time in seconds
  };
};

$.updateStorage = function() {
  // This function updates the localStorage with the current state of the storage object.
  setLocalStorageObject('radiusraid', $.storage);
};

$.clearStorage = function() {
  // This function removes the 'radiusraid' localStorage item and reinitializes the storage object with defaults.
  removeLocalStorageObject('radiusraid');
  $.setupStorage();
};

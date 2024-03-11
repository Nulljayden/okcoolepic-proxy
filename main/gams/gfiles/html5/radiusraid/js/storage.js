// localStorage helper functions
function setLocalStorageObject(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorageObject(key) {
  var value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

function removeLocalStorageObject(key) {
  localStorage.removeItem(key);
}

$.setupStorage = function() {
  $.storage = getLocalStorageObject('radiusraid') || {
    'mute': 0,
    'autofire': 0,
    'score': 0,
    'level': 0,
    'rounds': 0,
    'kills': 0,
    'bullets': 0,
    'powerups': 0,
    'time': 0
  };
};

$.updateStorage = function() {
  setLocalStorageObject('radiusraid', $.storage);
};

$.clearStorage = function() {
  removeLocalStorageObject('radiusraid');
  $.setupStorage();
};

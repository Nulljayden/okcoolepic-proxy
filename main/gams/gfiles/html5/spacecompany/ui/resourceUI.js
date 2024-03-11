// Game.resourcesUI object provides methods for initializing and updating
// resource user interface elements. It is an immediately invoked function
// expression (IIFE) that returns an instance of an object.
Game.resourcesUI = (function() {

  // The object instance that will be returned by the IIFE.
  var instance = {};

  // Initializes resource UI elements by binding event listeners and
  // updating data bindings.
  instance.initialise = function() {
    // Iterate over each resource ID in the RESOURCE object.
    for (var id in RESOURCE) {
      // Check if an element with the resource ID exists in the DOM.
      if ($('#' + RESOURCE[id]).length > 0) {
        // Bind the element to a delegate function that retrieves
        // the current resource value.
        Game.ui.bindElement(RESOURCE[id], this.createResourceDelegate(RESOURCE[id]));
      }
      // Check if an element with the production stat ID exists in the DOM.
      if ($('#' + RESOURCE[id] + 'ps').length > 0) {
        // Bind the element to a delegate function that retrieves
        // the current production value.
        Game.ui.bindElement(RESOURCE[id] + 'ps', this.createProductionDelegate(RESOURCE[id]));
      }
      // Check if an element with the storage stat ID exists in the DOM.
      if ($('#' + RESOURCE[id] + 'Storage').length > 0) {
        // Bind the element to a delegate function that retrieves
        // the current storage value.
        Game.ui.bindElement(RESOURCE[id] + 'Storage', this.createStorageDelegate(RESOURCE[id]));
      }
      // Check if an element with the next storage stat ID exists in the DOM.
      if ($('#' + RESOURCE[id] + 'NextStorage').length > 0) {
        // Bind the element to a delegate function that retrieves
        // the next storage value.
        Game.ui.bindElement(RESOURCE[id] + 'NextStorage', this.createNextStorageDelegate(RESOURCE[id]));
      }
    }

    // Update automatic data bindings after initializing resource UI elements.
    Game.ui.updateAutoDataBindings();
  };

  // An empty update function that takes a delta value as an argument.
  instance.update = function(delta) {
  };

  // Creates a delegate function that retrieves the current resource value
  // based on the provided resource ID.
  instance.createResourceDelegate = function(id) {
    var func;
    if (id === RESOURCE.Science) {
      func = (function() {
        var current = getResource(id);
        if (current < 100) {
          return Game.settings.format(current, 1);
        } else {
          return Game.settings.format(current);
        }
      });
    }
    else if (id === RESOURCE.RocketFuel) {
      func = (function() {
        var current = getResource(id);
        if (current < 100) {
          return Game.settings.format(current, 1);
        } else {
          return Game.settings.format(current);
        }
      });
    }
    else {
      func = (function() {
        return Game.settings.format(getResource(id));
      });
    }
    return func;
  };

  // Creates a delegate function that retrieves the current production
  // value based on the provided resource ID.
  instance.createProductionDelegate = function(id) {
    var func;
    if (id === RESOURCE.Energy) {
      func = (function() {
        var production = getProduction(id);
        if (production >= 0) {
          if (production > 250) {
            return Game.settings.format(production);
          } else {
            return Game.settings.format(production * 2) / 2;
          }
        } else {
          if (production < -250) {
            return Math.round(production);
          } else {
            return Math.round(production * 2) / 2;
          }
        }
      });
    }
    else if (id === RESOURCE.Science) {
      func = (function() {
        return Game.settings.format(getProduction(id), 1);
      });
    }
    else if (id === RESOURCE.RocketFuel) {


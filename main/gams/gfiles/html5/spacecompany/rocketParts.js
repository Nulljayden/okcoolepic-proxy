// Game.interstellar.rocketParts object provides methods to manage rocket parts.
Game.interstellar.rocketParts = (function() {

  // The instance object contains all the data and methods for managing rocket parts.
  var instance = {};

  // The entries object stores all the rocket parts data, indexed by their IDs.
  instance.entries = {};

  // The categoryEntries object stores rocket parts data grouped by categories.
  instance.categoryEntries = {};

  // The initialise method initializes the rocket parts data by iterating over the Game.rocketPartsData object.
  instance.initialise = function() {
    for (var id in Game.rocketPartsData) {
      var data = Game.rocketPartsData[id];

      // Increase the navCount and extend the data object with additional properties.
      this.navCount++;
      this.entries[id] = data = $.extend({}, data, {
        id: id,
        htmlId: 'rocpart_' + id,
        count: 0,
        displayNeedsUpdate: true
      });
    }
  }

  // The calcCost method calculates the cost of a rocket part based on its default cost and the current count.
  instance.calcCost = function(self, resource) {
    return Math.floor(self.defaultCost[resource.toString()] * Math.pow(1.1, self.count) * rocketPrice);
  }

  // The updateCost method updates the cost of a rocket part for each resource.
  instance.updateCost = function(costData) {
    for (var resource in costData) {
      var target = 0;
      for (var i = 0; i < Object.keys(Game.interstellarUI.rocketPartObservers[costData.id]).length; i++) {
        if (resource == Game.interstellarUI.rocketPartObservers[costData.id][i].resource) {
          costData[resource.toString()] = this.calcCost(costData, resource);
          Game.interstellarUI.rocketPartObservers[costData.id][i].value = costData[resource.toString()];
        }
      }
    }
  }

  // The updateCost method updates the cost of a rocket part for each resource.
  instance.buildPart = function(entryName, buyNum) {
    for (var i = 0; i < buyNum; i++) {
      var resourcePass = 0;
      for (var resource in this.entries[entryName].cost) {
        if (window[resource.toString()] >= this.entries[entryName].cost[resource.toString()]) {
          resourcePass += 1;
        }
      }
      if (resourcePass === Object.keys(Game.interstellar.rocketParts.entries[entryName].cost).length) {
        var newValue = Math.floor(this.entries[entryName].count + 1);
        this.entries[entryName].count = Math.min(newValue, this.entries[entryName].max);
        for (var resource in this.entries[entryName].cost) {
          window[resource.toString()] -= this.entries[entryName].cost[resource.toString()];
        }
        this.entries[entryName].displayNeedsUpdate = true;
      }
    }
    this.updateCost(this.entries[entryName]);
  };

  // The unlock method sets the unlocked property of a rocket part to true and updates its display needs.
  instance.unlock = function(id) {
    this.entries[id].unlocked = true;
    this.entries[id].displayNeedsUpdate = true;
  };

  // The getPartData method returns the rocket part data for a given resource ID.
  instance.getPartData = function(id) {
    return this.entries[id];
  };

  return instance;

}());

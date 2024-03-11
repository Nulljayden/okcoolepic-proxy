/**
 * Game technology manager.
 * This module is responsible for managing all game technologies.
 * @namespace Game.tech
 */
Game.tech = (function() {

  // The tech manager instance.
  // This object will contain all the data related to game technologies.
  const instance = {};

  /**
   * The version of the tech data.
   * @type {number}
   * This variable stores the version of the tech data.
   */
  instance.dataVersion = 2;

  /**
   * The tech entries.
   * @type {Object}
   * This object stores all the tech data entries, with their IDs as keys.
   */
  instance.entries = {};

  /**
   * The number of tech types.
   * @type {number}
   * This variable stores the number of tech types available in the game.
   */
  instance.techTypeCount = 0;

  /**
   * Initializes the tech manager.
   * This method initializes the tech manager by initializing the tech UI and
   * loading all the tech data.
   */
  instance.initialise = function() {
    Game.techUI.initialise();
    for (const id in Game.techData) {
      const techData = this.initTech(id);
      this.techTypeCount++;
      this.entries[id] = techData;

      Game.techUI.addTech(techData);
    }
    console.debug(`Loaded ${this.techTypeCount} tech types`);
  };

  /**
   * Initializes a tech entry.
   * This method initializes a new tech entry with the given ID.
   * @param {string} id - The tech ID.
   * @returns {Object} The initialized tech data.
   */
  instance.initTech = function(id) {
    // Using extend to create a new object and leave the defaults unchanged
    const techData = jQuery.extend({}, Game.techData[id]);
    techData.setId(id);
    return techData;
  };

  /**
   * Resets the tech manager.
   * This method resets the tech manager by resetting all the tech data.
   */
  instance.reset = function() {
    for (const id in Game.techData) {
      const techData = this.initTech(id);
      this.entries[id] = techData;

      Game.techUI.replaceTech(techData);
    }
    refreshResearches();
    console.debug(`Loaded ${this.techTypeCount} tech types`);
  };

  /**
   * Updates the tech manager.
   * This method updates the tech manager by updating the tech data.
   * @param {number} delta - The time delta.
   */
  instance.update = function(delta) {};

  /**
   * Saves the tech data.
   * This method saves the tech data by storing it in the given data object.
   * @param {Object} data - The data object to save the tech data in.
   */
  instance.save = function(data) {
    data.tech = { v: this.dataVersion, i: {} };
    for (const key in this.entries) {
      data.tech.i[key] = {};
      data.tech.i[key].current = this.entries[key].current;
      data.tech.i[key].unlocked = this.entries[key].unlocked;
    }
  };

  /**
   * Loads the tech data.
   * This method loads the tech data by loading it from the given data object.
   * @param {Object} data - The data object to load the tech data from.
   */
  instance.load = function(data) {
    if (data.tech && data.tech.v && data.tech.i) {
      if (data.tech.v >= 2) {
        this.loadV2(data);
      } else if (data.tech.v === 1) {
        this.loadV1(data);
      }
    }
    const tech = Game.tech.getTechData('energyEfficiencyResearch');
    if (tech && tech.current === tech.maxLevel) {
      const child = document.getElementById('energyEffButton');
      if (child) {
        child.parentNode.removeChild(child);
      }
    }
  };

  /**
   * Loads tech data version 1.
   * This method loads tech data version 1 from the given data object.
   * @param {Object} data - The data object to load the tech data from.
   */
  instance.loadV1 = function(data) {
    // The new tech data matches the old ids stored in the arrays available and researched
    // Anything that was in available before can be considered unlocked
    for (const id in data.available) {
      if (this.entries[data.available[id]]) {
        this.entries[data.available[id]].unlocked = true;
      }
    }
    // Anything that was in researched before can be considered purchased
    for (const id in data.researched) {
      if (this.entries[data.researched[id]]) {
        this.entries[data.researched[id]].current = 1;
      }
    }
    for (const id in data.tech.i) {
      if (this.entries[id] && data.tech.i[id] > 0) {
        this.gainTech(id, data.tech.i[id]);
        this.entries[id].unlocked = true;
      }
    }
  };

  /**
   * Loads tech data version 2 or higher.
   * This method loads tech data version 2 or higher from the given data object.
   * @param {Object} data - The data object to load the tech data from.
   */
  instance.loadV2 = function(data) {
    for (const id in data.tech.i) {
      if (this.entries[id]) {
        if (data.tech.i[id].current !== undefined && data.tech.i[id].current > 0) {
          this

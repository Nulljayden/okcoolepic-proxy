// Game module, responsible for managing game objects and data loading/saving
var Game = (function() {
  'use strict';

  // Constructor for Game object, initializes game objects and loaded flag
  var Game = function() {
    this.lab = new GameObjects.Lab(); // Initialize lab game object
    this.gameObjects = {lab: this.lab}; // Initialize game objects container
    this.loaded = false; // Initialize loaded flag
  };

  // Load game data from JSON files and initialize game objects
  Game.prototype.load = function() {
    if (this.loaded) {
      return; // Exit if data is already loaded
    }

    this.loaded = true; // Set loaded flag to true

    // Return a Promise that resolves when all required JSON files are loaded
    return Promise.all([
      Helpers.loadFile('json/research.json'), // Load research data
      Helpers.loadFile('json/workers.json'), // Load workers data
      Helpers.loadFile('json/upgrades.json'), // Load upgrades data
      Helpers.loadFile('json/achievements.json'), // Load achievements data
    ])
    .then(([research, workers, upgrades, achievements]) => {
      // Initialize game objects from loaded data and add them to gameObjects container
      this.gameObjects.research = research.map(r => new GameObjects.Research(r));
      this.gameObjects.workers = workers.map(w => new GameObjects.Worker(w));
      this.gameObjects.upgrades = upgrades.map(u => new GameObjects.Upgrade(u));
      this.gameObjects.achievements = achievements.map(a => new GameObjects.Achievement(a));

      // Load game object states from storage
      for (const key in this.gameObjects) {
        const o = this.gameObjects[key];
        o.loadState(ObjectStorage.load(key));
      }
    })
    .catch(error => {
      console.error('Error loading game data:', error); // Log error if loading fails
      this.loaded = false; // Reset loaded flag
    });
  };

  // Save game object states to storage


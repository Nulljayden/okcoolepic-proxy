var Game = (function() {
  'use strict';

  var Game = function() {
    this.lab = new GameObjects.Lab();
    this.gameObjects = {lab: this.lab};
    this.loaded = false;
  };

  Game.prototype.load = function() {
    if (this.loaded) {
      return;
    }

    this.loaded = true;

    return Promise.all([
      Helpers.loadFile('json/research.json'),
      Helpers.loadFile('json/workers.json'),
      Helpers.loadFile('json/upgrades.json'),
      Helpers.loadFile('json/achievements.json'),
    ])
    .then(([research, workers, upgrades, achievements]) => {
      this.gameObjects.research = research.map(r => new GameObjects.Research(r));
      this.gameObjects.workers = workers.map(w => new GameObjects.Worker(w));
      this.gameObjects.upgrades = upgrades.map(u => new GameObjects.Upgrade(u));
      this.gameObjects.achievements = achievements.map(a => new GameObjects.Achievement(a));

      for (const key in this.gameObjects) {
        const o = this.gameObjects[key];
        o.loadState(ObjectStorage.load(key));
      }
    })
    .catch(error => {
      console.error('Error loading game data:', error);
      this.loaded = false;
    });
  };

  Game.prototype.save = function() {
    for (const key in this.gameObjects) {
      ObjectStorage.save(key, this.gameObjects[key].state);
    }
  };

  return {Game};
}());

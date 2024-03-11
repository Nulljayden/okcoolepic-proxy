/**
 * Game constants and settings.
 */
const COST_TYPE = {
  FIXED: 0
};

const TECH_TYPE = {
  UPGRADE: 0,
  UNLOCK: 1
};

const BUILDING_TYPE = {
  PRODUCER: 0
};

const RESOURCE_OBSERVER_TYPE = {
  CURRENT_VALUE: 0,
  SPECIFIC_VALUE: 1,
  CAPACITY: 2,
  PER_SECOND: 3
};

const RESOURCE = {
  Energy: 'energy',
  Plasma: 'plasma',
  Uranium: 'uranium',
  Lava: 'lava',
  Oil: 'oil',
  Metal: 'metal',
  Gem: 'gem',
  Charcoal: 'charcoal',
  Wood: 'wood',
  Silicon: 'silicon',
  Lunarite: 'lunarite',
  Methane: 'methane',
  Titanium: 'titanium',
  Gold: 'gold',
  Silver: 'silver',
  Hydrogen: 'hydrogen',
  Helium: 'helium',
  Ice: 'ice',
  Meteorite: 'meteorite',
  Science: 'science',
  RocketFuel: 'rocketFuel'
};

const INDEX_NONE = -1;

const GameConstants = (function() {

  const instance = {};

  /**
   * Icon settings.
   */
  const Icon = {
    PATH: "Icons/",
    EXTENSION: "png"
  };

  /**
   * Achievement settings.
   */
  instance.achievementMax = 1000;
  instance.achievementIconsPerRow = 4;
  instance.resourceAchievementBrackets = [50, 50000, 50000000, 50000000000, 50000000000000];
  instance.producerAchievementBrackets = [5, 25, 75, 150, 250];
  instance.achievementBracketColors = ["#9d9

/**
 * Module that registers the outdoors functionality
 */
var Outside = {

  // Properties for various delays and offsets
  _STORES_OFFSET: 0,
  _GATHER_DELAY: 60,
  _TRAPS_DELAY: 90,
  _POP_DELAY: [0.5, 3],
  _HUT_ROOM: 4,

  // Property for income data
  _INCOME: { ... },

  // Property for trap drops
  TrapDrops: [ ... ],

  // Initialization function
  init: function(options) { ... },

  // Function to get the maximum population
  getMaxPopulation: function() { ... },

  // Function to increase the population
  increasePopulation: function() { ... },

  // Function to decrease the population
  killVillagers: function(num) { ... },

  // Function to destroy huts and decrease the population
  destroyHuts: function(num, allowEmpty) { ... },

  // Function to schedule the next population increase
  schedulePopIncrease: function() { ... },

  // Function to update the workers view
  updateWorkersView: function() { ... },

  // Function to get the number of gatherers
  getNumGatherers: function() { ... },

  // Function to create a worker row
  makeWorkerRow: function(key, num) { ... },

  // Function to increase or decrease workers
  increaseWorker: function(btn) { ... },
  decreaseWorker: function(btn) { ... },

  // Function to update a village row
  updateVillageRow: function(name, num, village) { ... },

  // Function to update the village
  updateVillage: function(ignoreStores) { ... },

  // Function to check if a worker is required for a building
  checkWorker: function(name) { ... },

  // Function to update village income
  updateVillageIncome: function() { ... },

  // Function to update the trap button
  updateTrapButton: function() { ... },

  // Function to set the title
  setTitle: function() { ... },

  // Function to handle onArrival events
  onArrival: function(transition_diff) { ... },

  // Function to gather wood
  gatherWood: function() { ... },

  // Function to check traps
  checkTraps: function() { ... },

  // Function to handle state updates
  handleStateUpdates: function(e) { ... },

  // Function to scroll the sidebar
  scrollSidebar: function(direction, reset) { ... }

};

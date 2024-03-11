// Global variables
let PSU = 0;
let PSUT2 = 0;
let heater = 0;
let plasmatic = 0;
let bath = 0;
let battery = 0;
let batteryT2 = 0;
let batteryT3 = 0;
let batteryT4 = 0;
let batteryT5 = 0;
let charcoalEngine = 0;
let solarPanel = 0;
let methaneStation = 0;
let nuclearStation = 0;
let magmatic = 0;
let fusionReactor = 0;
let grinder = 0;
let cubic = 0;
let enricher = 0;
let recycler = 0;
let pump = 0;
let pumpjack = 0;
let oilField = 0;
let oilRig = 0;
let miner = 0;
let heavyDrill = 0;
let gigaDrill = 0;
let quantumDrill = 0;
let gemMiner = 0;
let advancedDrill = 0;
let diamondDrill = 0;
let carbyneDrill = 0;
let woodburner = 0;
let furnace = 0;
let kiln = 0;
let fryer = 0;
let woodcutter = 0;
let laserCutter = 0;
let deforester = 0;
let infuser = 0;
let moonWorker = 0;
let moonDrill = 0;
let moonQuarry = 0;
let planetExcavator = 0;
let vacuum = 0;
let suctionExcavator = 0;
let spaceCow = 0;
let vent = 0;
let explorer = 0;
let lunariteDrill = 0;
let pentaDrill = 0;
let titanDrill = 0;
let droid = 0;
let destroyer = 0;
let deathStar = 0;
let actuator = 0;
let scout = 0;
let spaceLaser = 0;
let bertha = 0;
let cannon = 0;
let blowtorch = 0;
let scorcher = 0;
let annihilator = 0;
let desert = 0;
let crucible = 0;
let extractor = 0;
let extruder = 0;
let veluptuator = 0;
let collector = 0;
let magnet = 0;
let eCell = 0;
let hindenburg = 0;
let drone = 0;
let tanker = 0;
let compressor = 0;
let skimmer = 0;
let icePick = 0;
let iceDrill = 0;
let freezer = 0;
let mrFreeze = 0;
let printer = 0;
let web = 0;
let smasher = 0;
let nebulous = 0;

// Constants
const T1Price = 1.1;

// Convenience wrappers for Game.resources methods
function getResource(id) {
  return Game.resources.getResource(id);
}

function getStorage(id) {
  return Game.resources.getStorage(id);
}

function getProduction(id) {
  return Game.resources.getProduction(id);
}

function getResourceAfterTick(id, delta) {
  return getResource(id) + getProduction(id) * delta;
}

// ... rest of the code

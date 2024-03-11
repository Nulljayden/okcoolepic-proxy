// Energy Calculation Functions
function calculateEnergyOutput(delta) {
  if (globalEnergyLock) return 0;

  let output = 0;
  const multiplier = 1 + (Game.stargaze.entries.darkMatter.count * dmBoost);

  // Fixed outputs first
  output += (ring * ringOutput) + (swarm * swarmOutput) + (sphere * sphereOutput) + (solarPanel * solarPanelOutput);

  // Resource-based outputs
  const resourceOutputs = [
    { resource: 'Charcoal', input: charcoalEngineCharcoalInput, engine: charcoalEngine, output: charcoalEngineOutput },
    { resource: 'Methane', input: methaneStationMethaneInput, engine: methaneStation, output: methaneStationOutput },
    { resource: 'Uranium', input: nuclearStationUraniumInput, engine: nuclearStation, output: nuclearStationOutput },
    { resource: 'Lava', input: magmaticLavaInput, engine: magmatic, output: magmaticOutput },
    { resource: 'Hydrogen', input: fusionReactorHydrogenInput, input2: fusionReactorHeliumInput, engine: fusionReactor, output: fusionReactorOutput },
  ];

  for (const { resource, input, engine, output, input2 } of resourceOutputs) {
    const resourceAfterTick = getResourceAfterTick(resource, delta);
    if (resourceAfterTick >= input * delta) {
      output += engine * output;
    }
    if (engine === fusionReactor && resourceAfterTick >= input2 * delta) {
      output += engine * output;
    }
  }

  return output * multiplier;
}

function calculateEnergyUse(delta) {
  if (globalEnergyLock) return 0;

  let use = 0;

  // Plasma energy consumption
  const plasmaEngines = [
    { engine: heater, input: heaterHydrogenInput, energyInput: heaterEnergyInput },
    { engine: plasmatic, input: plasmaticHeliumInput, energyInput: plasmaticEnergyInput },
    { engine: bath, input: plasmaticHydrogenInput, energyInput: bathEnergyInput },
  ];

  for (const { engine, input, energyInput } of plasmaEngines) {
    const plasmaAfterTick = getResourceAfterTick(RESOURCE.Plasma, delta);
    if (heaterToggled && plasmaAfterTick >= input * 10 * delta) {
      use += engine * energyInput;
    }
    if (plasmaticToggled && plasmaAfterTick >= input * 10 * delta) {
      use += engine * energyInput;
    }
    if (bathToggled && plasmaAfterTick >= input * 10 * delta) {
      use += engine * energyInput;
    }
  }

  // Other energy consumptions
  const energyConsumptions = [
    { type: 'Uranium', input: cubicEnergyInput, engines: [cubic, enricher, recycler, planetNuke] },
    { type: 'Lava', input: extractorEnergyInput, engines: [extractor, extruder, veluptuator, condensator] },
    { type: 'Oil', input: pumpjackEnergyInput, engines: [pumpjack, oilField, oilRig, fossilator] },
    { type: 'Metal', input: heavyDrillEnergyInput, engines: [heavyDrill, gigaDrill, quantumDrill, multiDrill] },
    { type: 'Gems', input: advancedDrillEnergyInput, engines: [advancedDrill, diamondDrill, carbyneDrill, diamondChamber] },
    { type: 'Charcoal', engines: [furnace, kiln, fryer, microPollutor], input: furnaceEnergyInput, toggled: charcoalToggled },
    { type: 'Wood', engines: [laserCutter, deforester, infuser, forest], input: laserCutterEnergyInput, toggled: false },
    { type: 'Silicon', engines: [scorcher, annihilator, desert, tardis], input: scorcherEnergyInput, toggled: false },
    { type: 'Lunarite', engines: [moonDrill, moonQuarry, planetExcavator, cloner], input: moonDrillEnergyInput, toggled: false },
    { type: 'Methane', engines: [suctionExcavator, spaceCow, vent, interCow], input: suctionExcavatorEnergyInput, toggled: false },
    { type: 'Titanium', engines: [lunariteDrill, pentaDrill, titanDrill, club], input: lunariteDrillEnergyInput, toggled: false },
    { type: 'Gold', engines: [destroyer, deathStar, actuator, philosopher], input: destroyerEnergyInput, toggled: false },
    { type: 'Silver', engines: [spaceLaser, bertha, cannon, werewolf], input: spaceLaserEnergyInput, toggled: false },
    { type: 'Hydrogen', engines: [magnet, eCell, hindenburg, harvester], input: magnetEnergyInput, toggled: false },
    { type: 'Helium', engines: [tanker, compressor, skimmer, cage], input: tankerEnergyInput, toggled: false },
    { type: 'Ice', engines: [iceDrill, freezer, mrFreeze, overexchange], input: iceDrillEnergyInput, toggled: false },
  ];

  for (const { type, engines, input, toggled } of energyConsumptions) {
    let useAmount = 0;
    if (toggled === true) {
      for (const engine of engines) {
        useAmount += engine * input;
      }
    } else {
      for (const engine of engines) {
        useAmount += engine * input;
      }
    }
    use += useAmount

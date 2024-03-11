// Solar System Tab

// Function to get a chemical plant
function getChemicalPlant() {
  if (hasEnoughResources(chemicalPlantCost)) {
    consumeResources(chemicalPlantCost);
    chemicalPlant += 1;
    updateFuelProductionCost();
  }
}

// Function to get oxidisation
function getOxidisation() {
  if (hasEnoughResources(oxidisationCost)) {
    consumeResources(oxidisationCost);
    oxidisation += 1;
    updateFuelProductionCost();
  }
}

// Function to get hydrazine
function getHydrazine() {
  if (hasEnoughResources(hydrazineCost)) {
    consumeResources(hydrazineCost);
    hydrazine += 1;
    updateFuelProductionCost();
  }
}

// Function to update fuel production cost
function updateFuelProductionCost() {
  chemicalPlantCost = calculateCost(chemicalPlant);
  oxidisationCost = calculateCost(oxidisation);
  hydrazineCost = calculateCost(hydrazine);
}

// Function to get a rocket
function getRocket() {
  if (hasEnoughResources(rocketCost)) {
    consumeResources(rocketCost);
    rocket = 1;
    document.getElementById("rocket").textContent = "Built";
    document.getElementById("rocketRocketCost").className = "";
    document.getElementById("solarRocket").className = "hidden";
  }
}

// Function to launch a rocket
function launchRocket() {
  if (rocket >= 1 && hasEnoughRocketFuel(20)) {
    consumeRocketFuel(20);
    rocket -= 1;
    document.getElementById("spaceRocket").className = "hidden";
    document.getElementById("collapseInner").className = "collapseInner";
    document.getElementById("moon").className = "inner";
    document.getElementById("mercury").className = "inner";
    document.getElementById("venus").className = "inner";
    document.getElementById("mars").className = "inner";
    document.getElementById("asteroidBelt").className = "inner";
    rocketLaunched = true;
  }
}

// Function to explore a planet
function explore(planet) {
  const planetsData = {
    Moon: { fuel: 20, area: "innerPlanet", resource: "lunarite" },
    Venus: { fuel: 50, area: "innerPlanet", resource: "methane" },
    Mars: { fuel: 80, area: "innerPlanet", resource: "titanium,silicon" },
    AsteroidBelt: { fuel: 200, area: "innerPlanet", resource: "gold,silver" },
    WonderStation: { fuel: 500 },
    Jupiter: { fuel: 1000, area: "outerPlanet", resource: "hydrogen" },
    Saturn: { fuel: 2000, area: "outerPlanet", resource: "helium" },
    Pluto: { fuel: 5000, area: "outerPlanet", resource: "ice" },
    KuiperBelt: { fuel: 6000, area: "outerPlanet" },
    SolCenter: { fuel: 7000 },
  };

  if (!planetsData[planet]) {
    console.error(`Cannot explore "${planet}", data not found.`);
    return;
  }

  if (hasEnoughRocketFuel(planetsData[planet].fuel)) {
    consumeRocketFuel(planetsData[planet].fuel);
    handlePlanetExploration(planet);
  }
}

// Helper function to check if enough resources are available
function hasEnoughResources(cost) {
  for (const [resource, costAmount] of Object.entries(cost)) {
    if (Game.resources[resource] < costAmount) {
      return false;
    }
  }
  return true;
}

// Helper function to consume resources
function consumeResources(cost) {
  for (const [resource, costAmount] of Object.entries(cost)) {
    Game.resources[resource] -= costAmount;
  }
}

// Helper function to check if enough rocket fuel is available
function hasEnoughRocketFuel(fuel) {
  return Game.resources.RocketFuel >= fuel;
}

// Helper function to consume rocket fuel
function consumeRocketFuel(fuel) {
  Game.resources.takeResource(RESOURCE.RocketFuel, fuel);
}

// Helper function to calculate the cost of a resource based on its level
function calculateCost(level) {
  const baseCost = {
    chemicalPlant: 1000,
    oxidisation: 12000,
    hydrazine: 140000,
  };
  return {
    metal: baseCost[level] * Math.pow(1.1, level),
    gem: baseCost[level] * Math.pow(1.1, level),
    oil: baseCost[level] * Math.pow(1.1, level),
  };
}


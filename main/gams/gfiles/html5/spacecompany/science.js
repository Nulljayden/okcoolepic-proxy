// Research Tab

// getLab function calculates the cost of upgrading the lab based on the given costMultiplier
// and checks if the player can afford it. If they can, the resources are subtracted, and the lab level is increased.
function getLab(costMultiplier) {
  const cost = {
    wood: labWoodCost * costMultiplier, // Cost in wood
    gem: labGemCost * costMultiplier,   // Cost in gems
    metal: labMetalCost * costMultiplier, // Cost in metal
  };

  if (canAfford(cost)) {
    subtractResources(cost);
    lab += 1; // Increase lab level
    updateLabCost(); // Update the costs for all lab levels
  }
}

// canAfford function checks if the player has enough resources to afford the given cost
function canAfford(cost) {
  return wood >= cost.wood && gem >= cost.gem && metal >= cost.metal;
}

// subtractResources function subtracts the given cost from the player's resources
function subtractResources(cost) {
  wood -= cost.wood;
  gem -= cost.gem;
  metal -= cost.metal;
}

// labCostMultipliers is an array of cost multipliers for each lab level
const labCostMultipliers = [1, 50, 960, 61000, 1240000];

// This loop creates functions for each lab level (1 to 5) that call the getLab function with the appropriate cost multiplier
for (let i = 1; i <= 5; i++) {
  function getLabTi() {
    getLab(labCostMultipliers[i - 1]);
  }
  window['getLabT' + i] = getLabTi;
}

// updateLabCost function calculates and updates the costs for all lab levels
function updateLabCost() {
  labWoodCost = Math.floor(10 * Math.pow(1.1, lab) * labT1Multi); // Calculate new cost for lab level 1
  labGemCost = Math.floor(15 * Math.pow(1.1, lab) * labT1Multi);   // Calculate new cost for lab level 1
  labMetalCost = Math.floor(20 * Math.pow(1.1, lab) * labT1Multi); // Calculate new cost for lab level 1

  labT2WoodCost = Math.floor(500 * Math.pow(1.1, labT2) * labT2PlusMulti); // Calculate new cost for lab level 2
  labT2GemCost = Math.floor(200 * Math.pow(1.1, labT2) * labT2PlusMulti);   // Calculate new cost for lab level 2
  labT2MetalCost = Math.floor(1000 * Math.pow(1.1, labT2) * labT2PlusMulti); // Calculate new cost for lab level 2

  labT3WoodCost = Math.floor(96

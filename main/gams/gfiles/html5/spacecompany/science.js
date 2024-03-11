// Research Tab

function getLab(costMultiplier) {
  const cost = {
    wood: labWoodCost * costMultiplier,
    gem: labGemCost * costMultiplier,
    metal: labMetalCost * costMultiplier,
  };

  if (canAfford(cost)) {
    subtractResources(cost);
    lab += 1;
    updateLabCost();
  }
}

function canAfford(cost) {
  return wood >= cost.wood && gem >= cost.gem && metal >= cost.metal;
}

function subtractResources(cost) {
  wood -= cost.wood;
  gem -= cost.gem;
  metal -= cost.metal;
}

const labCostMultipliers = [1, 50, 960, 61000, 1240000];

for (let i = 1; i <= 5; i++) {
  function getLabTi() {
    getLab(labCostMultipliers[i - 1]);
  }
  window['getLabT' + i] = getLabTi;
}

function updateLabCost() {
  labWoodCost = Math.floor(10 * Math.pow(1.1, lab) * labT1Multi);
  labGemCost = Math.floor(15 * Math.pow(1.1, lab) * labT1Multi);
  labMetalCost = Math.floor(20 * Math.pow(1.1, lab) * labT1Multi);

  labT2WoodCost = Math.floor(500 * Math.pow(1.1, labT2) * labT2PlusMulti);
  labT2GemCost = Math.floor(200 * Math.pow(1.1, labT2) * labT2PlusMulti);
  labT2MetalCost = Math.floor(1000 * Math.pow(1.1, labT2) * labT2PlusMulti);

  labT3WoodCost = Math.floor(9600 * Math.pow(1.1, labT3) * labT2PlusMulti);
  labT3GemCost = Math.floor(4700 * Math.pow(1.1, labT3) * labT2PlusMulti);
  labT3MetalCost = Math.floor(17000 * Math.pow(1.1, labT3) * labT2PlusMulti);

  labT4MetalCost = Math.floor(610000 * Math.pow(1.1, labT4) * labT2PlusMulti);
  labT4GemCost = Math.floor(37000 * Math.pow(1.1, labT4) * labT2PlusMulti);
  labT4WoodCost = Math.floor(926000 * Math.pow(1.1, labT4) * labT2PlusMulti);

  labT5MetalCost = Math.floor(12400000 * Math.pow(1.1, labT5) * labT2PlusMulti);
  labT5GemCost = Math.floor(7300000 * Math.pow(1.1, labT5) * labT2PlusMulti);
  labT5WoodCost = Math.floor(15900000 * Math.pow(1.1, labT5) * labT2PlusMulti);
}

// ... Rest of the code remains the same ...

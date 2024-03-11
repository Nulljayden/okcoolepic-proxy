// Wonders Tab
function updateWonderCost(floor1Price, floor23Price) {
  const updateCost = (cost, baseCost, resource) => cost * baseCost * floor1Price;

  const resources = [
    { type: 'precious', costs: ['Gem', 'Silver', 'Gold'], activateCosts: ['ActivateGem', 'ActivateSilver', 'ActivateGold'] },
    { type: 'energetic', costs: ['Wood', 'Charcoal', 'Uranium'], activateCosts: ['ActivateGem', 'ActivateCharcoal', 'ActivateUranium'] },
    { type: 'tech', costs: ['Silicon', 'Gold', 'Gem'], activateCosts: ['ActivateSilicon', 'ActivateGold', 'ActivateGem'] },
    { type: 'meteorite', costs: ['Meteorite', 'Ice', 'Silicon'], activateCosts: ['ActivateMeteorite', 'ActivateIce', 'ActivateSilicon'] },
    { type: 'comms', costs: ['Gold', 'Silicon', 'Ice'] },
    { type: 'rocket', costs: ['Lunarite', 'Titanium', 'Metal'] },
    { type: 'antimatter', costs: ['Uranium', 'Lava', 'Oil', 'Methane'] },
    { type: 'portal', costs: ['Meteorite', 'Helium', 'Silicon'] },
    { type: 'stargate', costs: ['Plasma', 'Silicon', 'Meteorite'] }
  ];

  resources.forEach(resourceGroup => {
    resourceGroup.costs.forEach((resource, index) => {
      resourceGroup[resource] = updateCost(getResource(RESOURCE[resource]), resourceGroup['base' + resource], resource);
    });

    if (resourceGroup.activateCosts) {
      resourceGroup.activateCosts.forEach((resource, index) => {
        resourceGroup[resource] = updateCost(getResource(RESOURCE[resource]), resourceGroup['base' + resource], resource);
      });
    }
  });

  commsWonderGoldCost = resources.find(r => r.type === 'comms').Gold;
  commsWonderSiliconCost = resources.find(r => r.type === 'comms').Silicon;
  commsWonderIceCost = resources.find(r => r.type === 'comms').Ice;

  rocketWonderLunariteCost = resources.find(r => r.type === 'rocket').Lunarite;
  rocketWonderTitaniumCost = resources.find(r => r.type === 'rocket').Titanium;
  rocketWonderMetalCost = resources.find(r => r.type === 'rocket').Metal;

  antimatterWonderUraniumCost = resources.find(r => r.type === 'antimatter').Uranium;
  antimatterWonderLavaCost = resources.find(r => r.type === 'antimatter').Lava;
  antimatterWonderOilCost = resources.find(r => r.type === 'antimatter').Oil;
  antimatterWonderMethaneCost = resources.find(r => r.type === 'comms').Methane;

  portalMeteoriteCost = resources.find(r => r.type === 'portal').Meteorite;
  portalHeliumCost = resources.find(r => r.type === 'portal').Helium;
  portalSiliconCost = resources.find(r => r.type === 'portal').Silicon;

  stargateWonderPlasmaCost = resources.find(r => r.type === 'stargate').Plasma;
  stargateWonderSiliconCost = resources.find(r => r.type === 'stargate').Silicon;
  stargateWonderMeteoriteCost = resources.find(r => r.type === 'stargate').Meteorite;
}

function updateProgressBar(elementId, percentage) {
  const element = document.getElementById(elementId);
  if (percentage <= 100) {
    element.textContent = Game.settings.format(percentage, 2) + "%";
    element.style.width = percentage + "%";
  } else {
    element.textContent = "100%";
    element.style.width = 100 + "%";
  }
}

function refreshWonderBars() {
  const updateBar = (resourceGroup, resources) => {
    const totalCost = resourceGroup.costs.reduce((acc, cur) => acc + resources[cur], 0);
    const currentAmount = resourceGroup.costs.reduce((acc, cur) => acc + getResource(RESOURCE[cur]), 0);
    const percentage = totalCost > 0 ? currentAmount / totalCost : 0;
    updateProgressBar(resourceGroup.bar, percentage * 100);
  };

  const resourceGroups = [
    { type: 'precious', bar: 'preciousBar' },
    { type: 'energetic', bar: 'energeticBar', activateBar: 'preciousActivateBar' },
    { type: 'tech', bar: 'techBar', activateBar: 'techActivateBar' },
    { type: 'meteorite', bar: 'meteoriteBar', activateBar: 'meteoriteActivateBar' },
    { type: 'comms', bar: 'commsWonderBar' },
    { type: 'rocket', bar: 'rocketWonderBar' },
    { type: 'antimatter', bar: 'antimatterWonderBar' },
    { type: 'portal', bar: 'portalBar' },
    { type: 'stargate', bar: 'stargateWonderBar' }
  ];

  resourceGroups.forEach(resourceGroup => {
    if (resourceGroup.activateBar) {
      const activateResources = resources[resourceGroup.type].activateCosts.reduce((acc, cur) => {
        acc[cur] = getResource(RESOURCE[cur]);
        return acc;
      }, {});

      const

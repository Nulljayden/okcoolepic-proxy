// Sol Center Tab

function takeResources(resources) {
  for (const [resource, amount] of Object.entries(resources)) {
    Game.resources.takeResource(resource, amount);
  }
}

function unlockTech(techName) {
  if (Game.tech.canUnlock(techName)) {
    Game.tech.unlockTech(techName);
    newUnlock("research");
    buttonsHidden.push(techName);
  }
}

function updateResearch(researchId, classNameHidden, classNameVisible) {
  const researchElement = document.getElementById(researchId);
  const unlockElement = document.getElementById(researchId.replace("research", "unlock"));

  if (getResourcesSufficient(researchId)) {
    takeResources(getResourceCosts(researchId));
    researchElement.className = classNameHidden;
    unlockElement.className = classNameVisible;
  } else {
    Game.notify("Insufficient resources to unlock " + researchId.replace("research", ""));
  }
}

function getResourcesSufficient(researchId) {
  const costs = getResourceCosts(researchId);
  for (const [resource, amount] of Object.entries(costs)) {
    if (getResource(resource) < amount) {
      return false;
    }
  }
  return true;
}

function getResourceCosts(researchId) {
  let costs;
  switch (researchId) {
    case "researchPlasma":
      costs = {
        Hydrogen: 1500,
        Uranium: 1500,
        Oil: 15000,
        Wood: 15000,
      };
      break;
    case "researchEmc":
      costs = {
        Energy: 75000,
        Plasma: 100,
      };
      break;
    case "researchDyson":
      costs = {
        Energy: 100000,
        Plasma: 10000,
      };
      break;
    default:
      throw new Error("Invalid researchId: " + researchId);
  }
  return costs;
}

// ... (rest of the code)

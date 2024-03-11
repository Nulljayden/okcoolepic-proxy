// Sol Center Tab

// takes the specified resources
function takeResources(resources) {
  // iterate through the resources object
  for (const [resource, amount] of Object.entries(resources)) {
    // subtract the specified amount of the resource from the game's resources
    Game.resources.takeResource(resource, amount);
  }
}

// unlocks the specified technology if it can be unlocked
function unlockTech(techName) {
  if (Game.tech.canUnlock(techName)) {
    // unlock the technology
    Game.tech.unlockTech(techName);
    // call the newUnlock function with the argument "research"
    newUnlock("research");
    // add the technology name to the buttonsHidden array
    buttonsHidden.push(techName);
  }
}

// updates the research element and unlock element based on the researchId
function updateResearch(researchId, classNameHidden, classNameVisible) {
  const researchElement = document.getElementById(researchId);
  const unlockElement = document.getElementById(researchId.replace("research", "unlock"));

  if (getResourcesSufficient(researchId)) {
    // subtract the resource costs for the researchId
    takeResources(getResourceCosts(researchId));
    // set the className of the research element to classNameHidden
    researchElement.className = classNameHidden;
    // set the className of the unlock element to classNameVisible
    unlockElement.className = classNameVisible;
  } else {
    // notify the user of insufficient resources
    Game.notify("Insufficient resources to unlock " + researchId.replace("research", ""));
  }
}

// checks if the player has sufficient resources for the researchId
function getResourcesSufficient(researchId) {
  const costs = getResourceCosts(researchId);
  for (const [resource, amount] of Object.entries(costs)) {
    if (getResource(resource) < amount) {
      return false;
    }
  }
  return true;
}

// returns the resource costs for the researchId
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
     

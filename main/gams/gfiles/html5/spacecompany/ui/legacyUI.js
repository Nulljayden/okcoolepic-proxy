const RESOURCE_STORAGE = [
  { resource: RESOURCE.Uranium, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Oil, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Metal, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Gem, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Charcoal, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Wood, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Lunarite, baseCost: storagePrice, lunariteMultiplier: 1 },
  { resource: RESOURCE.Methane, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Titanium, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Gold, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Silver, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Silicon, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Lava, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Hydrogen, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Helium, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Ice, baseCost: storagePrice, lunariteMultiplier: 4 },
  { resource: RESOURCE.Meteorite, baseCost: storagePrice, lunariteMultiplier: 4 },
];

function registerLegacyBindings() {
  RESOURCE_STORAGE.forEach(({ resource, baseCost, lunariteMultiplier }) => {
    Game.ui.bindElement(`uraniumStorage${resource}Cost`, () =>
      Game.settings.format(getStorage(resource) * baseCost)
    );
    Game.ui.bindElement(`uraniumStorage${resource}LunariteCost`, () =>
      Game.settings.format(getStorage(resource) / 2.5 * baseCost * lunariteMultiplier)
    );
  });

  // Bind other elements here in a similar manner
}

function legacyRefreshUI() {
  // ...

  Object.entries({
    heater: heaterToggled,
    plasmatic: plasmaticToggled,
    bath: bathToggled,
    charcoal: charcoalToggled,
    rocketFuel: rocketFuelToggled,
    meteorite: meteoriteToggled,
    antimatter: antimatterToggled,
  }).forEach(([elementId, isToggled]) => {
    $(`#${elementId}Toggled`).text(isToggled === true ? "Off" : "On");
  });
}

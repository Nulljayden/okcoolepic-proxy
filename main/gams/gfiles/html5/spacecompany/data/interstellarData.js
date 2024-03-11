// An object that defines the properties for general items.
const generalPropertyDefinitions = {
  unlocked: false, // Indicates if the item is unlocked or not.
  displayNeedsUpdate: true, // A flag to indicate if the display needs to be updated.
};

// An object that defines the properties for faction-related items.
const factionPropertyDefinitions = {
  opinion: 0, // The current opinion or standing of the faction.
  unlocked: false, // Indicates if the faction-related item is unlocked or not.
};

// The commsPropertyDefinitions object is a combination of generalPropertyDefinitions and an additional category property set to 'comms'.
const commsPropertyDefinitions = {
  ...generalPropertyDefinitions,
  category: 'comms', // The category of the item, in this case, 'comms'.
};

// The rocketPropertyDefinitions object is a combination of generalPropertyDefinitions and built and category properties.
const rocketPropertyDefinitions = {
  ...generalPropertyDefinitions,
  built: 'Not Built', // The current built status of the rocket.
  category: 'rocket', // The category of the item, in this case, 'rocket'.
};

// ... antimatterPropertyDefinitions, militaryPropertyDefinitions, and other property definition objects follow the same pattern.

// Game.interstellarCategoryData is an object containing data for the 'general' and 'faction' categories.
Game.interstellarCategoryData = {
  general: {
    title: 'Interstellar', // The title of the category.
    category: 'general', // The category name.
    description: '', // A placeholder for a description.
    ...generalPropertyDefinitions, // The properties for general items.
  },
  faction: {
    title: 'Faction Star Systems',
    category: 'faction',
    ...factionPropertyDefinitions,
  },
};

// Game.interstellarData is an object containing data for various interstellar aspects, such as 'comms', 'rocket', 'antimatter', 'travel', and 'military'.
Game.interstellarData = {
  comms: {
    name: 'Communications', // The name of the interstellar aspect.
    desc: 'This is where you learn about other systems to travel to. <br><b>NB: The first star, Alpha Centauri is 4.3 LY away. 1 IRS will not get you there.</b>', // A description of the interstellar aspect.
    ...commsPropertyDefinitions, // The properties for 'comms' items.
  },
  rocket: {
    name: 'Rockets',
    desc: 'This is where you can construct your transport to the stars.',
    ...rocketPropertyDefinitions,
  },
  // ... antimatter, travel, military, carnelian, and other interstellar data objects follow the same pattern.
};

// The rest of the objects follow the same pattern, so I haven't included them here to keep the response concise.

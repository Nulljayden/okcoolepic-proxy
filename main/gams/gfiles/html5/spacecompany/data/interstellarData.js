const generalPropertyDefinitions = {
  unlocked: false,
  displayNeedsUpdate: true,
};

const factionPropertyDefinitions = {
  opinion: 0,
  unlocked: false,
};

const commsPropertyDefinitions = {
  ...generalPropertyDefinitions,
  category: 'comms',
};

const rocketPropertyDefinitions = {
  ...generalPropertyDefinitions,
  built: 'Not Built',
  category: 'rocket',
};

const antimatterPropertyDefinitions = {
  ...generalPropertyDefinitions,
  category: 'antimatter',
};

const militaryPropertyDefinitions = {
  ...generalPropertyDefinitions,
  category: 'military',
};

Game.interstellarCategoryData = {
  general: {
    title: 'Interstellar',
    category: 'general',
    ...generalPropertyDefinitions,
  },
  faction: {
    title: 'Faction Star Systems',
    category: 'faction',
    ...factionPropertyDefinitions,
  },
};

Game.interstellarData = {
  comms: {
    name: 'Communications',
    desc: 'This is where you learn about other systems to travel to. <br><b>NB: The first star, Alpha Centauri is 4.3 LY away. 1 IRS will not get you there.</b>',
    ...commsPropertyDefinitions,
  },
  rocket: {
    name: 'Rockets',
    desc: 'This is where you can construct your transport to the stars.',
    ...rocketPropertyDefinitions,
  },
  antimatter: {
    name: 'Antimatter',
    desc: 'Your fuel for interstellar travel is produced here. Unfortunately, you can only handle 100k Antimatter per Star System as it is incredibly volatile.<br><br><button class="btn btn-default" onclick="toggleAntimatter()">Toggle Antimatter <span id="antimatterToggled">On</span></button>',
    ...antimatterPropertyDefinitions,
  },
  travel: {
    name: 'Travel',
    desc: 'Here, you can travel across the cosmos to your heart\'s desire. When you explore a star system, it will appear in the respective faction tab, where you can gain control of it for boosts in the resources present. The number in () after the distance is the antimatter needed to travel there.',
    ...commsPropertyDefinitions,
  },
  military: {
    name: 'Military',
    desc: 'This is where you can build up your fleet of ships to invade other systems. Your total fleet\'s attributes are based on which ships you own.',
    ...militaryPropertyDefinitions,
  },
  carnelian: {
    name: "Carnelian Resistance",
    desc: "A ruthless faction with a fierce anger towards the ones in power, most notable, the Prasnian Empire. They are incessant in their opposition and focus their whole force towards attacking their enemies. Because of this, what they offer comprises mostly of upgrades tending towards a more active gameplay.",
    ...factionPropertyDefinitions,
  },
  // ... other factions follow the same pattern
};

// The rest of the objects follow the same pattern, so I haven't included them here
// to keep the response concise.

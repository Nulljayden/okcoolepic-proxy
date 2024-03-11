Game.resourceCategoryData = (function () {
    const instance = {};

    instance.energy = {
        title: 'Energy',
        category: 'energy'
    };

    instance.earth = {
        class: 'collapseEarth',
        title: 'Earth Resources',
        category: 'earth'
    };

    instance.innerSol = {
        class: 'collapseInnerPlanetary',
        title: 'Inner Planetary Resources',
        category: 'innerSol'
    };

    instance.outerSol = {
        class: 'collapseOuterPlanetary',
        title: 'Outer Planetary Resources',
        category: 'outerSol'
    };

    return instance;
}());

function getResourceData(category, name) {
    return Game.resourceData[category][name];
}

function getUpgradeData(category, name) {
    return Game.storageData[category][name];
}

function getResourceUpgrades(resource) {
    const category = resource.category;
    const name = resource.name;
    return [
        getUpgradeData(category, `${name}StorageUpgrade1`),
        getUpgradeData(category, `${name}StorageUpgrade2`),
        getUpgradeData(category, `${name}StorageUpgrade3`),
        getUpgradeData(category, `${name}StorageUpgrade4`),
        getUpgradeData(category, `${name}StorageUpgrade5`),
    ].filter(upgrade => upgrade !== undefined);
}

Game.resourceData = {
    energy: {
        energy: {
            name: 'Energy',
            desc: 'Energy is created by power sources such as steam engines, solar power and advances even to fusion power and nuclear energy. The maximum you can hold to start with is 100,000 Energy, but batteries are unlockable which can increase this.',
            icon: 'energyIcon',
            category: 'energy',
            baseCapacity: 50000,
            unlocked: false,
            version: '1.0.0'
        },
        plasma: {
            name: 'Plasma',
            desc: 'Plasma is the 4th state of matter and is used by Tier 4 machines and large space structures as an extreme power source for your company.',
            icon: 'plasmaIcon',
            category: 'energy',
            baseCapacity: 50,
            unlocked: false,
            version: '1.0.0'
        },
        uranium: {
            name: 'Uranium',
            desc: 'Metal is one of the primary resources. It is used for many things, including storage upgrades, machinery and most things in space.',
            icon: 'uraniumIcon',
            category: 'energy',
            baseCapacity: 50,
            unlocked: false,
            version: '1.0.0'
        },
        lava: {
            name: 'Lava',
            desc: 'Hard to handle and only found in volcanoes, Lava is one of the hardest resources to get.',
            icon: 'lavaIcon',
            category: 'energy',
            baseCapacity: 50,
            unlocked: false,
            version: '1.0.0'
        },
    },
    earth: {
        oil: {
            name: 'Oil',
            desc: 'Oil is pumped up from the ground and is used to build Tier 2 resource gatherers.',
            icon: 'oilIcon',
            category: 'earth',
            baseCapacity: 50,
            unlocked: false,
            version: '1.0.0'
        },
        metal: {
            name: 'Metal',
            desc: 'Metal is one of the primary resources. It is used for many things, including storage upgrades, machinery and most things in space.',
            icon: 'metalIcon',
            category: 'earth',
            baseCapacity: 50,
            unlocked: true,
            version: '1.0.0'
        },
        gem: {
            name: 'Gem',
            desc: 'Gems are one of the primary resources. They are used for advanced machines and for powerful tools and components. They are more useful in later game.',
            icon: 'gemIcon',
            category: 'earth',
            baseCapacity: 50,
            unlocked: true,
            version: '1.0.0'
        },
        charcoal: {
            name: 'Charcoal',
            desc: 'Charcoal is a secondary tier resource and is used by Engines to produce power for your company. 1 Charcoal is created by burning wood',
            icon: 'charcoalIcon',
            category: 'earth',
            baseCapacity: 50,
            unlocked: false,
            version: '1.0.0'
        },
        wood: {
            name: 'Wood',
            desc: 'Wood is one of the primary resources. It is used more often in early game for tools and buildings.',
            icon: 'woodIcon',
            category: 'earth',
            baseCapacity: 50,
            unlocked: true,
            version: '1.0.0'
        },
        silicon: {
            name: 'Silicon',
            desc: 'Silicon is useful for automatic mining systems of the third tier. These will be very useful in building your first wonder. Despite being a high tier resource, it is found mainly on Earth by heating sand.',
            icon: 'siliconIcon',
            category: 'earth',


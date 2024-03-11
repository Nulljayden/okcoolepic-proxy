// Game.resourceCategoryData is a self-invoking function that returns an object (instance) containing resource categories.
Game.resourceCategoryData = (function () {
    const instance = {};

    // Energy category object with properties title and category.
    instance.energy = {
        title: 'Energy',
        category: 'energy'
    };

    // Earth, innerSol, and outerSol categories are objects with class, title, and category properties.
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

    // Returns the instance object.
    return instance;
}());

// getResourceData function takes category and name as arguments and returns the resource data from Game.resourceData.
function getResourceData(category, name) {
    return Game.resourceData[category][name];
}

// getUpgradeData function takes category and name as arguments and returns the upgrade data from Game.storageData.
function getUpgradeData(category, name) {
    return Game.storageData[category][name];
}

// getResourceUpgrades function takes a resource object as an argument and returns an array of upgrade objects.
function getResourceUpgrades(resource) {
    const category = resource.category;
    const name = resource.name;

    // Array of upgrade objects for the given resource.
    return [
        getUpgradeData(category, `${name}StorageUpgrade1`),
        getUpgradeData(category, `${name}StorageUpgrade2`),
        getUpgradeData(category, `${name}StorageUpgrade3`),
        getUpgradeData(category, `${name}StorageUpgrade4`),
        getUpgradeData(category, `${name}StorageUpgrade5`),
    ].filter(upgrade => upgrade !== undefined);
}

// Game.resourceData object with energy and earth categories as properties.
Game.resourceData = {
    energy: {
        // Energy resource object with name, desc, icon, category, baseCapacity, unlocked, and version properties.
        energy: {
            name: 'Energy',
            desc: 'Energy is created by power sources such as steam engines, solar power and advances even to fusion power and nuclear energy. The maximum you can hold to start with is 100,000 Energy, but batteries are unlockable which can increase this.',
            icon: 'energyIcon',
            category: 'energy',
            baseCapacity: 50000,
            unlocked: false,
            version: '1.0.0'
        },
        // Other resource objects in the energy category.
    },
    earth: {
        // Resource objects in the earth category.
    },
};

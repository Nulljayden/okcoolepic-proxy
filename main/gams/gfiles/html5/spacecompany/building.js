/**
 * Game.buildings module
 *
 * Handles the creation, updating, and saving of game buildings.
 */
Game.buildings = (function() {

    /**
     * The buildings module instance.
     * @type {Object}
     */
    const instance = {};

    /**
     * The version number of the data format.
     * @type {number}
     */
    instance.dataVersion = 1;

    /**
     * The building data entries.
     * @type {Object}
     */
    instance.entries = {};

    /**
     * Whether to update production per second.
     * @type {boolean}
     */
    instance.updatePerSecondProduction = true;

    /**
     * Initializes the buildings module.
     */
    instance.initialise = function() {
        for (const id in Game.buildingData) {
            const data = Game.buildingData[id];
            instance.entries[id] = Object.assign({}, data, {
                id: id,
                htmlId: 'resbld_' + id,
                current: 0,
                iconPath: Game.constants.iconPath,
                iconName: data.icon,
                iconExtension: Game.constants.iconExtension,
                max: data.maxCount,
            });
        }

        console.debug("Loaded " + Object.keys(instance.entries).length + " Building Types");
    };

    /**
     * Updates the buildings module.
     * @param {number} delta - The time delta in seconds.
     */
    instance.update = function(delta) {
        if (instance.updatePerSecondProduction === true) {
            instance.updateProduction();
        }
    };

    /**
     * Saves the buildings module data.
     * @param {Object} data - The data object to save to.
     */
    instance.save = function(data) {
        data.buildings = { v: instance.dataVersion, i: {} };
        for (const key in instance.entries) {
            data.buildings.i[key] = instance.entries[key].current;
        }
    };

    /**
     * Loads the buildings module data.
     * @param {Object} data - The data object to load from.
     */
    instance.load = function(data) {
        if (data.buildings) {
            if (data.buildings.v && data.buildings.v === instance.dataVersion) {
                for (const id in data.buildings.i) {
                    if (instance.entries[id]) {
                        instance.constructBuildings(id, data.buildings.i[id]);
                    }
                }
            }
        }
    };

    /**
     * Constructs buildings.
     * @param {string} id - The building ID.
     * @param {number} count - The number of buildings to construct.
     */
    instance.constructBuildings = function(id, count) {
        // Add the buildings and clamp to the maximum
        const newValue = Math.min(instance.entries[id].current + count, instance.entries[id].max);
        instance.entries[id].current = newValue;
        instance.updatePerSecondProduction = true;
    };

    /**
     * Destroys buildings.
     * @param {string} id - The building ID.
     * @param {number} count - The number of buildings to destroy.
     */
    instance.destroyBuildings = function(id, count) {
        // Remove the buildings and ensure we can not go below 0
        const newValue = Math.max(instance.entries[id].current - count, 0);
        instance.entries[id].current = newValue;
        instance.updatePerSecondProduction = true;
    };

    /**
     * Unlocks a building.
     * @param {string} id - The building ID.
     */
    instance.unlock = function(id) {
        instance.entries[id].unlocked = true;
    };

    /**
     * Updates the production per second.
     */
    instance.updateProduction = function() {
        for (const id in instance.entries) {
            const data = instance.entries[id];
            if (data.current == 0 || !data.resource) {
                continue;
            }

            const baseValue = data.current * (data.perSecond || 0);
            Game.resources.setPerSecondProduction(data.resource, baseValue);
        }

        instance.updatePerSecondProduction = false;
    };

    /**

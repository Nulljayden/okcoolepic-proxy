// Game.resources object definition
Game.resources = (function(){

    // The instance object containing all the game resources data
    var instance = {};

    // Data version for serialization
    instance.dataVersion = 5;

    // Resource entries with id as key
    instance.entries = {};

    // Resource category entries with id as key
    instance.categoryEntries = {};

    // Storage upgrades with id as key
    instance.storageUpgrades = {};

    // Count of resource types
    instance.resourceTypeCount = 0;

    // Count of resource categories
    instance.resourceCategoryCount = 0;

    // Count of storage upgrades
    instance.storageUpgradeCount = 0;

    // Initialization function
    instance.initialise = function() {
        // Iterate through resource data and initialize resource entries
        for (var id in Game.resourceData) {
            // ... initialization code ...
        }

        // Iterate through resource category data and initialize category entries
        for (var id in Game.resourceCategoryData) {
            // ... initialization code ...
        }

        // Iterate through storage data and initialize storage upgrades
        for (var id in Game.storageData) {
            // ... initialization code ...
        }

        // Log the number of resource categories and resource types loaded
        console.debug("Loaded " + this.resourceCategoryCount + " Resource Categories");
        console.debug("Loaded " + this.resourceTypeCount + " Resource Types");
    };

    // Function to update resources with a given delta time
    instance.update = function(delta) {
        // Iterate through resource entries and update resources
        for(var id in this.entries) {
            // ... update code ...
        }
    };

    // Function to save the game resources data
    instance.save = function(data) {
        // Save resources data to the provided data object
        data.resources = { v: this.dataVersion, r: {}};
        for(var key in this.entries) {
            data.resources.r[key] = {
                n: this.entries[key].current,
                u: this.entries[key].unlocked
            }
        }
    };

    // Function to load the game resources data
    instance.load = function(data) {
        // Load resources data from the provided data object
        if(data.resources) {
            if(data.resources.v && data.resources.v === this.dataVersion) {
                for(var id in data.resources.i) {
                    if(this.entries[id]) {
                        // ... load code ...
                    }
                }
            }
        }
    };

    // Function to get a resource value by id
    instance.getResource = function(id) {
        // ... get resource code ...
    };

    // Function to get a storage value by id
    instance.getStorage = function(id) {
        // ... get storage code ...
    };

    // Function to get production value by id
    instance.getProduction = function(id) {
        // ... get production code ...
    };

    // Function to add a resource value by id
    instance.addResource = function(id, count) {
        // ... add resource code ...
    };

    // Function to take (subtract) a resource value by id
    instance.takeResource = function(id, count) {
        // ... take resource code ...
    };

    // Function to set a resource to its maximum value by id
    instance.maxResource = function(id) {
        // ... max resource code ...
    };

    // Function to set per-second production for a resource by id
    instance.setPerSecondProduction = function(id, value) {
        // ... set per-second production code ...
    };

    // Function to upgrade storage for a resource by id
    instance.upgradeStorage = function(id){
        // ... upgrade storage code ...
    };

    // Function to calculate cost for a building
    instance.calcCost = function(self, resource){
        // ... calculate cost code ...
    };

    // Function to update cost for a building
    instance.updateCost = function(data){
        // TODO
    };

    // Function to buy a machine (building)
    instance.buyMachine = function(id, count){
        // ... buy machine code ...
    };

    // Function to destroy a machine (building)
    instance.destroyMachine = function(id, count){
        // ... destroy machine code ...
    };

    // Function to update resources per second for all resources
    instance.updateResourcesPerSecond = function(){
        // ... update resources per second code ...
    };

    // Function to unlock a resource by id
    instance.unlock = function(id) {
        // ... unlock resource code ...
    };

    // Function to get resource data by id
    instance.getResourceData = function(id) {
        // ... get resource data code ...
    };

    // Function to get category data by id
    instance.getCategoryData = function(id) {
        // ... get category data code ...
    };

    // Function to show resources by category
    instance.showByCategory = function(category) {
        // ... show resources by category code ...
    };

    // Function to hide resources by category
    instance.hideByCategory = function(category) {
        // ... hide resources by category code ...
    };

    // Return the instance object
    return instance;
}());

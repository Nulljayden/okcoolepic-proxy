// Define an object for different types of statistics
STATISTIC_TYPE = {
    NUMBER: 1,   // A statistic that represents a number
    TIME: 2      // A statistic that represents a time duration
};

// Game.statistics module
Game.statistics = (function(){

    // Create a new instance of the statistics object
    var instance = {};

    // Set the data version to 1
    instance.dataVersion = 1;

    // Initialize the statistics object
    instance.initialise = function() {
        // Create a statistic for manual resources mined
        this.createStatistic("manualResources", Game.constants.statisticCategoryGeneral, "Resources Mined By Hand");

        // Create statistics for each tier of machines owned
        for(var i = 1; i <= Game.constants.maxTier; i++) {
            this.createStatistic("tierOwned" + i, Game.constants.statisticCategoryGeneral, "Tier " + i + " Machines Owned");
        }

        // Create statistics for various unlockable categories
        this.createStatistic("tabsUnlocked", Game.constants.statisticCategoryUnlockable, "Tabs Unlocked", 7);
        this.createStatistic("resourcesUnlocked", Game.constants.statisticCategoryUnlockable, "Resources Unlocked", 16);
        this.createStatistic("techResearched", Game.constants.statisticCategoryUnlockable, "Technologies Researched", 26);
        this.createStatistic("placesExplored", Game.constants.statisticCategoryUnlockable, "Places Explored", 10);
        this.createStatistic("wondersBuilt", Game.constants.statisticCategoryUnlockable, "Wonders Built", 4);
        this.createStatistic("wondersActivated", Game.constants.statisticCategoryUnlockable, "Wonders Activated", 9);
        this.createStatistic("rebirthCount", Game.constants.statisticCategoryUnlockable, "Times rebirthed", 0);  

        // Create statistics for session time and time played
        this.createStatistic("sessionTime", Game.constants.statisticCategoryTiming, "Session time", 0, STATISTIC_TYPE.TIME);
        this.createStatistic("timePlayed", Game.constants.statisticCategoryTiming, "Time Played", 0, STATISTIC_TYPE.TIME);

        // Set some default values
        this.add('resourcesUnlocked', 3);

        console.debug("Loaded " + this.statisticTypeCount + " Statistics");
    };

    // Update the statistics object with a given delta time
    instance.update = function(delta) {
        this.updateUnlockedTabs();
    };

    // Update the number of unlocked tabs in the statistics object
    instance.updateUnlockedTabs = function() {
        // Calculate the number of unlocked tabs
        var tabCount = 1 + tabsUnlocked.length;
        tabCount += $.inArray("solCenterTopTab", resourcesUnlocked) >= 0 ? 1 : 0;

        // Set the value of the 'tabsUnlocked' statistic
        this.setValue('tabsUnlocked', tabCount);
    };

    // Set the value of a statistic in the statistics object
    instance.setValue = function(id, value, valueAlltime) {
        this.entries[id].value = value;
        this.entries[id].valueAlltime = valueAlltime;
        this.entries[id].displayNeedsUpdate = true;
    };

    // Add a value to a statistic in the statistics object
    instance.add = function(id, value) {
        if (!this.entries[id]) {
            console.warn("Statistic not defined: " + id);
            return;
        }

        this.entries[id].value += value || 1;
        this.entries[id].valueAlltime += value || 1;
        this.entries[id].displayNeedsUpdate = true;
    };

    // Get the value of a statistic in the statistics object
    instance.get = function(id, getAlltime) {
        if (getAlltime === true) {
            return this.entries[id].valueAlltime;
        }

        return this.entries[id].value;
    };

    // Create a new statistic in the statistics object
    instance.createStatistic = function(id, category, title, maxValue, type) {
        var data = {
            id: id,
            category: category,
            title: title,
            value: 0,
            valueAlltime: 0,
            max: maxValue || 0,
            type: type || STATISTIC_TYPE.NUMBER,
            displayNeedsUpdate: true
        };

        // Increment the statistic type count
        this.statisticTypeCount++;

        // Add the new statistic to the entries object
        this.entries[data.id] = data;
    };

    // Save the statistics object to a given data object
    instance.save = function(data) {
        data.statistics = {version: this.dataVersion, entries: {}};
        for(var id in this.entries) {
            if(this.entries[id].value > 0) {
                data.statistics.entries[id] = {v: this.entries[id].value, va: this.entries[id].valueAlltime};
            }
        }
    };

    // Load the statistics object from a given data object
    instance.load = function(data) {
        this.loadLegacy(data);

        if(data.statistics) {
            if(data.statistics.version && data.statistics.version === this.dataVersion) {
                for(var id in data.statistics.entries) {
                    if(this.entries[id]){
                        this.setValue(id, data.statistics.entries[id].v, data.statistics.entries[id].va);
                    }
                }
            }
        }

        // Reset some statistics that we don't care about being persistent, might have to add a flag for em later
        this.setValue('sessionTime', 0, 0);


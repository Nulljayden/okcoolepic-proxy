Game.techData = (function () {

    function Tech(config) {
        this.id = config.id;
        this.name = config.name;
        this.desc = config.desc;
        this.buttonText = config.buttonText;
        this.type = config.type;
        this.costType = config.costType;
        this.cost = config.cost;
        this.newResources = config.newResources || [];
        this.newTechs = config.newTechs || [];
        this.newTabs = config.newTabs || [];
        this.tabAlerts = config.tabAlerts || [];
        this.onApply = config.onApply;
        this.level = 0;
        this.maxLevel = config.maxLevel || 1;
        this.unlocked = config.unlocked || false;
    }

    Tech.prototype.getCost = function() {
        let cost = {};
        for (let resource in this.cost) {
            cost[resource] = Math.ceil(this.cost[resource] * Math.pow(1.1, this.level));
        }
        return cost;
    }

    Tech.prototype.canAfford = function() {
        let cost = this.getCost();
        for (let resource in cost) {
            if (Game.resources[resource] < cost[resource]) {
                return false;
            }
        }
        return true;
    }

    Tech.prototype.buy = function() {
        if (!this.unlocked) return;
        let cost = this.getCost();
        for (let resource in cost) {
            Game.resources[resource] -= cost[resource];
        }
        this.level++;
        if (this.onApply) this.onApply();
        for (let i = 0; i < this.newResources.length; i++) {
            if (resourcesUnlocked.indexOf(this.newResources[i]) === INDEX_NONE) {
                resourcesUnlocked.push(this.newResources[i]);
            }
        }
        for (i = 0; i < this.newTechs.length; i++) {
            Game.tech.unlockTech(this.newTechs[i]);
        }
        for (i = 0; i < this.newTabs.length; i++) {
            if (tabsUnlocked.indexOf(this.newTabs[i]) === INDEX_NONE) {
                tabsUnlocked.push(this.newTabs[i]);
            }
        }
    }

    var techBase = {
        id: null,
        htmlId: null,
        htmlIdCost: null,
        htmlIdTitle: null,
        htmlIdButton: null,
        displayNeedsUpdate: true,

        setId: function(id) {
            this.id = id;
            this.htmlId = id;
            this.htmlIdCost = id + 'Cost';
            this.htmlIdTitle = id + 'Title';
            this.htmlIdButton = id + 'Button';
        },

        getBodyElement: function() {
            return $('#' + this.htmlId);
        },
        getTitleElement: function() {
            return $('#' + this.htmlIdTitle);
        },
        getCostElement: function() {
            return $('#' + this.htmlIdCost);
        },
        getButtonElement: function() {
            return $('#' + this.htmlIdButton);
        }
    };

    // Researches
    var unlockStorage = Object.create(techBase);
    unlockStorage.name = 'Storage Upgrades';
    unlockStorage.desc = 'This will allow you to build storage upgrades to increase the maximum on the amount of resource you can have at once.';
    unlockStorage.buttonText = 'Unlock Storage';
    unlockStorage.type = TECH_TYPE.UNLOCK;
    unlockStorage.costType = COST_TYPE.FIXED;
    unlockStorage.cost = {
        'science': 5
    };
    unlockStorage.newTechs = ['unlockOil'];
    unlockStorage.tabAlerts = ['resources', 'wonder'];

    // ... continue for other techs

    var techs = [
        unlockStorage,
        unlockBasicEnergy,
        unlockOil,
        unlockSolar,
        unlockMachines,
        unlockDestruction,
        unlockSolarSystem,
        unlockRocketFuelT2,
        unlockRocketFuelT3,
        unlockLabT2,
        unlockLabT3,
        unlockLabT4,
        unlockBatteries,
        unlockBatteriesT2,
        unlockBatteriesT3,
        unlockBatteriesT4,
        unlockPlasma,
        unlockPlasmaTier2,
        unlockPSU,
        unlockPSUT2,
        unlockEmc,
        unlockMeteorite,
        unlockMeteoriteTier1,
        unlockMeteoriteTier2,
        unlockDyson,
        unlockDysonSphere,
        upgradeResourceTech,
        upgradeEngineTech,
        upgradeSolarTech,
        efficiencyResearch,
        scienceEfficiencyResearch,
        energyEfficiencyResearch,
        batteryEfficiencyResearch
    ];

    for (let i = 0; i < techs.length; i++) {
        techs[i].setId(i);
    }

    return techs;
}());

/**
 * Prestige object for managing player prestige data.
 * @namespace Prestige
 */
var Prestige = {

    /**
     * The name of the prestige object.
     * @type {string}
     */
    name: 'Prestige',

    /**
     * The options for the prestige object.
     * @type {object}
     */
    options: {},

    /**
     * The map of stores for the prestige object.
     * @type {array}
     */
    storesMap: [
        { store: 'wood', type: 'g' },
        { store: 'fur', type: 'g' },
        { store: 'meat', type: 'g' },
        { store: 'iron', type: 'g' },
        { store: 'coal', type: 'g' },
        { store: 'sulphur', type: 'g' },
        { store: 'steel', type: 'g' },
        { store: 'cured meat', type: 'g' },
        { store: 'scales', type: 'g' },
        { store: 'teeth', type: 'g' },
        { store: 'leather', type: 'g' },
        { store: 'bait', type: 'g' },
        { store: 'torch', type: 'g' },
        { store: 'cloth', type: 'g' },
        { store: 'bone spear', type: 'w' },
        { store: 'iron sword', type: 'w' },
        { store: 'steel sword', type: 'w' },
        { store: 'bayonet', type: 'w' },
        { store: 'rifle', type: 'w' },
        { store: 'laser rifle', type: 'w' },
        { store: 'bullets', type: 'a' },
        { store: 'energy cell', type: 'a' },
        { store: 'grenade', type: 'a' },
        { store: 'bolas', type: 'a' }
    ],

    /**
     * Initializes the prestige object with options.
     * @param {object} options - The options for the prestige object.
     */
    init: function(options) {
        this.options = $.extend(this.options, options);
    },

    /**
     * Gets the stores for the prestige object.
     * @param {boolean} reduce - Whether to reduce the stores or not.
     * @return {array} - The array of stores.
     */
    getStores: function(reduce) {
        var stores = this.storesMap.map(function(s) {
            var amount = $SM.get('stores["' + s.store + '"]', true);
            return reduce ? Math.floor(amount / this.randGen(s.type)) : amount;
        }, this);
        return stores;
    },

    /**
     * Gets the previous prestige data.
     * @return {object} - The previous prestige data.
     */
    get: function() {
        return {
            stores: $SM.get('previous.stores'),
            score: $SM.get('previous.score')
        };
    },

    /**
     * Sets the previous prestige data.
     * @param {object} prestige - The previous

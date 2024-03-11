/**
 * The stars module of the interstellar game.
 * @module Game.interstellar.stars
 */

Game.interstellar.stars = (function() {

    /**
     * The instance of the stars module.
     * @type {Object}
     */
    var instance = {};

    /**
     * The version number of the data format used by this module.
     * @type {number}
     */
    instance.dataVersion = 1;

    /**
     * An object containing data for each star.
     * @type {Object}
     */
    instance.entries = {};

    /**
     * The number of stars in the game.
     * @type {number}
     */
    instance.starCount = 0;

    /**
     * The number of star systems that have been conquered.
     * @type {number}
     */
    instance.systemsConquered = 0;

    /**
     * Initializes the stars module by creating an entry for each star in the `Game.starData` object.
     */
    instance.initialise = function() {
        if (Game.starData && Object.keys(Game.starData).length > 0) {
            for (var id in Game.starData) {
                if (typeof id === 'string') {
                    var data = Game.starData[id];

                    instance.starCount++;
                    instance.entries[id] = $.extend({}, data, {
                        id: id,
                        htmlId: 'star_' + id,
                        current: 0,
                        spy: 0,
                        explored: false,
                        owned: false,
                        displayNeedsUpdate: false,
                    });
                } else {
                    console.error

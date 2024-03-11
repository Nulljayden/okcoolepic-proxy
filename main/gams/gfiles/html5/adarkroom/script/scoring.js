/**
 * Score object to calculate and manage the player's score.
 */
var Score = {

  /**
   * The name of the object to be used as a namespace.
   * @type {string}
   */
  name: 'Score',

  /**
   * Options for the Score object.
   * @type {Object}
   */
  options: {},

  /**
   * Initializes the Score object with the given options.
   * @param {Object} options - The options to initialize the object with.
   */
  init: function(options) {
    if (typeof options !== 'object') {
      console.error('Invalid options provided to Score.init');
      return;
    }
    this.options = $.extend(this.options, options);
  },

  /**
   * Calculates the player's score based on the current game state.
   * @return {number} The calculated score.
   */
  calculateScore: function() {
    var scoreUnadded = Prestige.getStores(false);
    var fullScore = 0;

    const factor = [1, 1.5, 1, 2, 2, 3, 3, 2, 2, 2, 2, 1.5, 1, 1, 10, 30, 50, 100, 150, 150, 3, 3, 5, 4];
    for (let i = 0; i < factor.length; i++) {
      fullScore += scoreUnadded[i] * factor[i];
    }

    fullScore += $SM.get('stores

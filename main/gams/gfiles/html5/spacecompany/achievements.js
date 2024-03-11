/**
 * Achievements module for the Game object.
 * @module Game.achievements
 */

Game.achievements = (function() {

	'use strict';

	/**
	 * The achievements instance.
	 * @type {Object}
	 */
	var instance = {};

	/**
	 * The version number of the data.
	 * @type {number}
	 */
	instance.dataVersion = 6;

	/**
	 * The next available ID for an achievement.
	 * @type {number}
	 */
	instance.nextId = 0;

	/**
	 * The current rank of the player.
	 * @type {number}
	 */
	instance.rank = 1;

	/**
	 * The current XP of the player.
	 * @type {number}
	 */
	instance.xp = 0;

	/**
	 * The entries in the achievements list.
	 * @type {Object}
	 */
	instance.entries = {};

	/**
	 * The number of achievements in the list.
	 * @type {number}
	 */
	instance.achievementCount = 0;

	/**
	 * The number of achievements and their tiers in the list.
	 * @type {number}
	 */
	instance.achievementCountIncludingTiers = 0;

	/**
	 * Initializes the achievements module.
	 */
	instance.initialise = function() {
		for (var id in Game.achievementsData) {
			var data = Game.achievementsData[id];
			this.entries[id] = $.extend({}, data, {
				id: id,
				category: data.categoryInstance.title,
				iconPath: Game.constants.iconPath,
				iconExtension: Game.constants.iconExtension,
				unlocked: -1,
				progressDisplay: -1,
				displayNeedsUpdate: true
			});
			if (data.brackets === undefined) {
				this.entries[id].brackets = data.categoryInstance.brackets;
			}

			this.achievementCount++;
			this.achievementCountIncludingTiers += this.entries[id].brackets.length;
		}
		
		console.debug("Loaded " + this.achievementCount + " (" + this.achievementCountIncludingTiers +") Achievements");
	};

	/**
	 * Gets the title of an achievement.
	 * @param  {Object} data - The achievement data.
	 * @return {string} The title of the achievement.
	 */
	instance.getAchievementTitle = function(data) {
		if(data.unlocked === data.brackets.length - 1) {
			var title = data.title.replace('%s', Game.settings.format(data.brackets[data.unlocked]));
			return title + " (Completed)";
		} else {
			var title = data.title.replace('%s', Game.settings.format(data.brackets[data.unlocked+1]));
			return title + ' (' + data.progressDisplay + '%)';
		}
	};

	/**
	 * Gets the title of an achievement for a tooltip.
	 * @param  {Object} data - The achievement data.
	 * @return {string} The title of the achievement.
	 */
	instance.getAchievementTitleForTooltip = function(data) {
		return this.getAchievementTitle(data, true);
	};

	/**
	 * Updates the achievements.
	 * @param  {number} delta - The time elapsed since the last update.
	 */
	instance.update = function(delta) {
		for(var id in this.entries) {
			var data = this.entries[id];
			if(!data.evaluator || !data.progressEvaluator) {
				continue;
			}
			var bracket = data.brackets[data.unlocked + 1];

			if(data.unlocked < data.brackets.length - 1 && data.evaluator(bracket)) {
				Game.notifySuccess("Achievement Reached", this.getAchievementTitle(data));

				this.unlock(id, data.unlocked + 1);

				newUnlock('more');
			} else if(data.unlocked < data.brackets.length - 1) {
	

// Create a module pattern for Game.achievementsUI
Game.achievementsUI = (function() {

  // Create an instance object to hold all the methods and properties
  var instance = {};

  // Define templates for handlingbars
  instance.rankTemplate = null;
  instance.entryTemplate = null;
  instance.categoryTemplate = null;

  // Initialize variables to hold DOM elements
  instance.categoryElements = {};
  instance.rootElement = null;

  // Initialize the instance
  instance.initialise = function() {
    // Compile the rank template
    instance.rankTemplate = Handlebars.compile(
      ['<td>',
        '<h3 class="default btn-link">Current Rank: <br><span id="rankNumber">{{number}}</span> - <span id="rankName">{{name}}</span></h3>',
        '</td>'].join('\n'));

    // Compile the rank bar template
    instance.rankBarTemplate = Handlebars.compile(
      ['<td colspan="2">',
        '<div id="rankProgress" class="progress">',
          '<div id="rankBar" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">',
            '0%',
          '</div>',
        '</div>',
        '</td>'].join('\n'));

    // Compile the category template
    instance.categoryTemplate = Handlebars.compile(
      ['<td>',
        '<h3 class="default btn-link">{{name}} (<span id="{{id}}_unlocked">0</span>/<span id="{{id}}_total">0</span>)</h3>',
        '<table class="table" id="{{id}}"></table>',
        '</td>'].join('\n'));

    // Compile the entry template
    instance.entryTemplate = Handlebars.compile(
      ['<td id="{{id}}" class="achievementTD" style="border:none;">',
        '<div id="{{id}}_div" data-toggle="tooltip" title="{{title}}" style="width: 64px; height: 64px; border:2px solid white;">',
        '<div id="{{id}}_bg" style="width: 50px; height: 40px; background: url({{iconPath}}{{iconName}}.{{iconExtension}}) no-repeat center; -webkit-background-size: contain;background-size: contain; margin-left: 5px;opacity: 0.2"></div>',
        '<div id="{{id}}_img" style="overflow: hidden; vertical-align: bottom;"><img src="Icons/achievementStar.png" height="11px"></div>',
        '</div>',
        '</td>'].join('\n'));

    // Set the root element to the achievement content
    instance.rootElement = $('#achievementContent');

    // Create the first rank
    instance.createRank(0);

    // Loop through all the achievements and create their displays
    for (var id in Game.achievements.entries) {
      instance.createDisplay(id);
    }
  };

  // Update the achievements UI
  instance.update = function(delta) {
    var categoryCounts = {};
    var updateCategories = false;
    var totalAchieved = 0;

    // Initialize categoryCounts
    for (var category in instance.categoryElements) {
      categoryCounts[category] = {
        unlocked: 0,
        total: 0
      };
    }

    // Loop through all the achievements and update the counts
    for (var id in Game.achievements.entries) {
      var data = Game.achievements.entries[id];

      // Update the total achieved and category counts
      totalAchieved += Game.utils.pascal(data.unlocked + 1);
      categoryCounts[data.category].unlocked += data.unlocked + 1;
      categoryCounts[data.category].total += data.brackets.length;

      // Check if the display needs to be updated
      if (data.displayNeedsUpdate === true) {
        instance.updateDisplay(id);
        updateCategories = true;
      }
    }

    // Update the categories if any displays were updated
    if (updateCategories === true) {
      for (var category in instance.categoryElements) {
        var id = instance.categoryElements[category].id;
        $('#' + id + '_unlocked').text(categoryCounts[category].unlocked);
        $('#' + id + '_total').text(categoryCounts[category].total);
      }
    }

    // Calculate the ranks

    // Get the current rank and experience needed
    var xpNeeded = Game.utils.fibonacci(instance.currentRank + 7);
    var xpLeft = Game.utils.fibonacci(instance.currentRank + 7) - totalAchieved;

    // If the player has enough experience, increase the rank
    if (xpLeft <= 0) {
      instance.currentRank += 1;
    }

    // Calculate the percentage of experience left
    var percentLeft = Game.settings.format(100 - (xpLeft / xpNeeded * 100)) + '%';

    // Update the rank bar and number
    $('#rankBar').text(percentLeft + ' (' + (xpNeeded - xpLeft) + '/' + xpNeeded + ')');
    $('#rankBar').width(percentLeft);
    $('#rankNumber').text(instance.currentRank);
    $('#rankName').text(Game.constants.rank[instance.currentRank]);

  };

  // Create a display for an achievement
  instance.createDisplay = function(id) {
    var data = Game.achievements.entries[id];

    // If the category doesn't exist, create it
    if (instance.categoryElements[data.category] === undefined) {
      instance.createCategory(data.category);
    }

    // Create the HTML for the achievement
    var html = instance.entryTemplate(data);

    // Increment the column

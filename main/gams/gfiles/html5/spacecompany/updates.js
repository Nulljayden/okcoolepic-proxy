// Game updates module, responsible for handling game updates and displaying them to the user
Game.updates = (function() {
  // Create a new instance of the updates module
  var instance = {};

  // Array to store update entries
  instance.entries = [];

  // Version number of the updates
  instance.versionNumber = 1;

  // Flag to check if the updates have been read
  instance.updateRead = false;

  // Template for the update title
  instance.updateTitleTemplate = Handlebars.compile([
    '<div id="updateAlert" class="alert alert-info alert-dismissible fade in">',
    '<button href="#" class="close btn.btn-info" data-dismiss="alert" aria-label="close">Close</button>',
    '<strong>New Update!</strong> These are the features since you last played:<br>',
    '<ul id="updateLog"></ul>',
    '</div>'
  ].join('\n'));

  // Template for the update entry
  instance.updateTemplate = Handlebars.compile('<li><span>{{desc}}</span></li>');

  // Initialize the updates
  instance.initialise = function() {
    // If metal is not zero
    if (metal != 0) {
      // Create the update alert box
      var target = $('#updateBox');
      var html = this.updateTitleTemplate();
      target.append($(html));

      // Loop through the updates data
      for (var id in Game.updatesData) {
        // If the number of entries is less than 5
        if (this.entries.length < 5) {
          // Create a display for the update
          this.createDisplay(Game.updatesData[id]);
        } else {
          // Increment the extra updates counter
          extra += 1;
        }
      }

      // If there are extra updates
      if (extra > 0) {
        // Create an extra updates entry
        var extraUpdates = {
          desc: '+' + extra + ' more. Click the version number to see the full changelog.',
          read: false
        }
        this.createDisplay(extraUpdates);
      }

      // If the updates have not been read
      if (this.updateRead === false) {
        // Hide the update alert box
        document.getElementById("updateAlert").className = "hidden";
      }
    } else {
      // If metal is zero
      // Mark all updates as read
      for (var id in Game.updatesData) {
        Game.updatesData[id].read = true;
      }
    }
  }

  // Create a display for an update
  instance.createDisplay = function(self) {
    // If the update has not been read
    if (self.read == false) {
      // Add the update to the entries array
      this.entries.push(self);

      // Get the update log element
      var target = $('#updateLog');

      // Create the update entry
      var html = this.updateTemplate(self);

      // Add the update entry to the update log
      target.append($(html));

      // Mark the update as read
      self.read = true;
      this.updateRead = true;
    }
  }

  // Save the game updates data
  instance.save = function(data) {
    data.updates = {
      versionNumber: 1,
      entries: {}
    };
    for (var id in Game.updatesData) {
      data.updates.entries[id] = Game.updatesData[id];
    }
  }

  // Load the game updates data
  instance.load = function(data) {
    // If the updates data exists and the version number is correct
    if (data.updates && data.updates.versionNumber && data.updates.versionNumber == 1) {
      // Set the version number and updates data
      Game.updates.versionNumber = data.versionNumber;
      for (var id in data.updates.entries) {
        Game.updatesData[id] = data.updates.entries[id];
      }
    }
  }

  // Get the update data for a given id
  instance.getUpdateData = function(id) {
    return Game.updatesData[id];
  }

  return instance;

}());

// Game updates data
Game.updatesData = (function() {

  var instance = {};

  // List of update entries
  instance.nerfEnergyEff = {
    desc: 'Nerfed Energy Efficiency to be 100x cheaper, but only go up to 25%',
    read: false
  };

  instance.batteryEff = {
    desc: 'Battery Efficiency Upgrade increases your battery storage by 1% (max 50)',
    read: false
  };

  instance.effResearchLevel = {
    desc: 'Changed Efficiency researches to show current level instead of next level',
    read: false
  };

  instance.buffBattEff = {
    desc: 'Buffed Battery Efficiency to go up to 200 levels instead of 50.',
    read: false
  };

  instance.redDestroy = {
    desc: 'More -> Graphics Options. Added option to turn destroy buttons red.',
    read: false
  };

  instance.nerfRocketFuelResearch = {
    desc: 'Increased the Science cost of Rocket Fuel researches',
    read: false
  };

  instance.rocketFuelT3 = {
    desc: 'Added Hydrazine Catalyst - T3 Rocket Fuel',
    read: false
  };

  instance.achievFormat = {
    desc: 'Added Achievement Number Formatting',
    read: false
  };

  instance.splash = {
    desc: 'There are now 100 Loading Messages!',
    read: false
  };

  instance.stargazeIntro = {
    desc: 'Barebones + Intro added for Stargaze tab',
    read: false
  };

  instance.

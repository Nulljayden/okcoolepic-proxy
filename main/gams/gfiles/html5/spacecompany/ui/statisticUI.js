(function() {

    // Create an instance of the statistics display component
    var instance = {};

    // Store the category template, entry template, category elements, and root element
    instance.categoryTemplate = null;
    instance.entryTemplate = null;
    instance.categoryElements = {};
    instance.rootElement = null;

    // Initialize the component
    instance.initialise = function() {
        // Compile the category template
        this.categoryTemplate = Handlebars.compile(
            ['<table class="table" id="{{id}}">',
                '<th class="default btn-link theader" style="border:none;">{{name}}</th>',
             '</table>'].join('\n'));

        // Compile the entry template
        this.entryTemplate = Handlebars.compile(
            ['<tr>',
                '<td style="width:80%">{{title}}:</td>',
                '<td><span id="{{id}}_val">0</span><br></td>',
             '</tr>'].join('\n'));

        // Set the root element for the component
        this.rootElement = $('#statisticContent');

        // Iterate through all the game statistics entries and create their displays
        for (var id in Game.statistics.entries) {
            this.createDisplay(id);
        }
    };

    // Update the component with new data
    instance.update = function(delta) {
        // Iterate through all the game statistics entries and update their displays if needed
        for (var id in Game.statistics.entries) {
            var data = Game.statistics.entries[id];

            if (data.displayNeedsUpdate === true) {
                this.updateDisplay(id);
            }
        }
        // Submit the "timePlayed" statistic to Kongregate (currently commented out)
        // kongregate.stats.submit("timePlayed", Game.statistics.entries.timePlayed.value);
    };

    // Create a display for a specific game statistics entry
    instance.createDisplay = function(id) {
        var data = Game.statistics.entries[id];

        // If the category element for this entry's category doesn't exist, create it
        if (this.categoryElements[data.category] === undefined) {
            this.createCategory(data.category);
        }

        // Create the HTML for the entry's display using the entry template
        var html = this.entryTemplate(data);

        // Append the new HTML to the corresponding category element
        $('#' + this.categoryElements[data.category].id).append($(html));
    };

    // Update a specific game statistics entry's display
    instance.updateDisplay = function(id) {
        var data = Game.statistics.entries[id];

        // Get the value span element for this entry's display
        var valueSpan = $('#' + id + "_val");

        // Update the value span based on the entry's data
        if (data.max > 0) {
            valueSpan.text(Game.settings.format(data.value) + " / " + Game.settings.format(data.max));
        } else {
            if (data.type === STATISTIC_TYPE.TIME) {
                valueSpan.text(Game.utils.getFullTimeDisplay(data.value));
            } else {
                valueSpan.text(data.value);
            }
        }

        // Set the displayNeedsUpdate flag to false for this entry
        data.displayNeedsUpdate = false;
    };

    // Create a category element for the component
    instance.createCategory = function(category) {
        var data = { id: "stat_cat_" + category, name: category };
        this.categoryElements[category] = { id: data.id };

        // Create the HTML for the category element using the category template
        var html = $(this.categoryTemplate(data));

        // Append the new HTML to the root element
        this.rootElement.

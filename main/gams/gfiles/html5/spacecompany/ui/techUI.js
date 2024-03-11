// Create a new techUI module pattern
Game.techUI = (function() {
	// Create an instance object to hold all methods and properties
	var instance = {};

	// Declare a reference to the techTable element
	instance.techTable = null;

	// Declare a reference to the techTemplate Handlebars template
	instance.techTemplate = null;

	// Initialize the techUI module
	instance.initialise = function() {
		// Assign the techTable variable to the jQuery object of the HTML element with id 'techTable'
		this.techTable = $('#techTable');

		// Compile the techTemplate Handlebars template using the provided markup
		this.techTemplate = Handlebars.compile([
			'<tr id="{{htmlId}}" class="hidden">',
			'<td>',
			'<h3 class="default btn-link" id="{{htmlIdTitle}}">{{name}}</h3>',
			'<span>',
			'{{desc}}',
			'<br>',
			'Costs <span id="{{htmlIdCost}}"></span> Science',
			'</span>',
			'<br><br>',
			'<button id="{{htmlIdButton}}" onclick="purchaseTech(\'{{id}}\')" class="btn btn-default">',
			'{{buttonText}}',
			'</button>',
			'<br><br>',
			'</td>',
		

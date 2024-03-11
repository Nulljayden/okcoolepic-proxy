// Define a function that takes a string as an argument and returns the string as is
var StrLoc = function(str) {
    // Return the input string without any modifications
    return str;
};

// Add a format method to the String prototype
String.prototype.format = function() {
    // Create a variable to store the formatted string
    var formatted = this;

    // Iterate over the arguments passed to the format method
    for (var i = 0; i < arguments.length; i++) {
        // Define a variable for the current key and argument
        var key = '{' + i.toString() + '}';
        var arg = arguments[i];

        // Check if the key exists in the formatted string
        if(formatted.indexOf(key) < 0) {
            // If the key is not found, throw an error
            throw new Error(StrLoc("Index {0} was not defined in string: {1}").format(i, formatted));
        }

        // Replace the key with the corresponding argument
        formatted = formatted.replace(key, arg);
    }

    // Return the formatted string
    return formatted;
};

// Add a clamp method to the Number prototype
Number.prototype.clamp = function(min, max) {
    // Return the clamped value
    return Math.min(Math.max(this, min), max);
};

// Add a textWidth method to the jQuery prototype
$.fn.textWidth = function(text, font) {
    // If the fakeEl variable is not defined, create it
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').appendTo(document.body);

    // Define the HTML text to be measured
    var htmlText = text || this.val() || this.text();

    // Encode the text to HTML and replace spaces with non-breaking spaces
    htmlText = $.fn.textWidth.fakeEl.text(htmlText).html().replace(/\s/g, "&nbsp;");

    // Set the font of the fake element to the specified font or the element's font
    $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));

    // Return the width of the fake element
    return $.fn.textWidth.fakeEl.width();
};

// Add a setText method to the jQuery prototype
$.fn.setText = function(text) {
    // If the length of the selected elements is not 1 or the first element's nodeType is not 1, call the text method
    if (this.length != 1 || this[0].nodeType != 1) {
        return this.text(text);
    }

    // Get the first element's childNodes
    var children = this[0].childNodes;

    // If the length of the childNodes is not 1 or the first child node's nodeType is not 3, call the text method
    if (children.length != 1 || children[0].nodeType != 3) {
        return this.text(text);
    }

    // Set the value of the first child node to the specified text
    children[0].nodeValue = text;

    // Return the jQuery object
    return this;
};

// Define the Game.utils object
Game.utils = (function(){

    // Create an instance of the object
    var instance = {};

    // Define the decimalSeparator property
    instance.decimalSeparator = function() {
        // Create a variable for the decimal separator
        var n = 1.1;

        // Get the decimal separator from the locale string
        n = n.toLocaleString().substring(1, 2);

        // Return the decimal separator
        return n;
    }();

    // Define the formatEveryThirdPower method
    instance.formatEveryThirdPower = function(notations)
    {
        // Return a function that takes a value as an argument
        return function (value)
        {
            // Ensure that the value is a number
            var value = value * 1;

            // Initialize variables for the base and notation value
            var base = 0;
            var notationValue = '';

            // Check if the value is greater than or equal to 1,000,000
            if (value >= 1000000)
            {
                // Divide the value by 1,000 and calculate the base
                value /= 1000;
                while(Math.round(value) >= 1000) {
                    value /= 1000;
                    base++;
                }

                // If the base is greater than the length of the notations array, return the string "Infinity"
                if (base > notations.length) {
                    return StrLoc('Infinity');
                } else {
                    // Set the notation value to the corresponding notation
                    notationValue = notations[base];
                }
            }

            // Format the value as a string with the specified number of decimal places
            var valueString = (Math.round(value * 1000) / 1000.0).toLocaleString();

            // If the notation value is not empty
            if(notationValue !== '') {
                // Get the number of digits in the value string
                var numberCount = valueString.replace(/[^0-9]/g, "").length;

                // Add trailing zeros to the value string if necessary
                var separator = valueString.indexOf(Game.utils.decimalSeparator) > 0 ? '' : Game.utils.decimalSeparator;
                switch (numberCount) {
                    case 1: valueString = valueString + separator + '000'; break;
                    case 2: valueString = valueString + separator + '00'; break;
                    case 3: valueString = valueString + separator + '0'; break;
                }

                // If the number of digits is greater than 4, remove the leading digits
                if (numberCount > 4) {
                    valueString = valueString.slice(0, 

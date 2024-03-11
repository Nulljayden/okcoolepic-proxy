// Check if the 'includes' method is already defined on the Array prototype
if (!Array.prototype.includes) {
  
  // If not, define it
  Array.prototype.includes = function(searchElement, fromIndex = 0) {
    // Use 'use strict' directive for safer execution of the function
    'use strict';
    
    // Create a new object 'O' from the array this function is called upon
    const O = Object(this);
    
    // Calculate the length of the array
    const len = O.length >>> 0;
    
    // If the length of the array is 0, return false
    if (len === 0) {
      return false;
    }
    
    // Convert 'fromIndex' to a 32-bit integer and set it to 'n'
    const n = fromIndex | 0;
    
    // Calculate the starting index 'k' based on the 'n' value
    const k = n >= 0 ? n : len - Math.abs(n);
    
    // Iterate through the array elements starting from 'k'
    for (; k < len; k++) {
      // If the current element matches 'searchElement', return true
      if (O[k] === searchElement) {
        return true;
      }
    }
    
    // If no match is found, return false
    return false;
  };
}

// Additional polyfill for handling NaN comparisons
Number.prototype.isNaN = function() {
  // Check if the number is not equal to itself, which is the case for NaN
  return this !== this;
};

// Check if the 'includesNaN' method is already defined on the Array prototype
if (!Array.prototype.includesNaN) {
  
  // If not, define it
  Array.prototype.includesNaN = function() {
    // Use the 'some' method to check if any element in the array is NaN
    return this.some(el => el !== el);
  };
}


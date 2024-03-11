// defaultInputAssignments object stores the default key mappings for various game controls.
// The keys in the object are the control names, and the values are arrays of key names.
const inputAssignments = {
  shiftLeft: ['left'],
  shiftRight: ['right'],
  softDrop: ['down'],
  rotateLeft: ['z'],
  rotateRight: ['x', 'up'],
  swap: ['shift', 'c'],
  hardDrop: ['space']
};

// autoRepeatConfig and thresholdConfig are configuration variables that control the behavior of the game.
const autoRepeatConfig = 50;
const thresholdConfig = 200;

// Function to load game controls from cookies
function loadGameControls() {
  // List of cookie names
  const cookies = [
    'rotateLeft',
    'rotateRight',
    'shiftLeft',
    'shiftRight',
    'softDrop',
    'hardDrop',
    'swap'
  ];

  // If custom controls need to be loaded
  if (getCookie('customControls') === 'TRUE') {
    // For each input cookie
    cookies.forEach((cookie) => {
      // Get the cookie value
      const curVal = getCookie(cookie);

      // If the cookie value is not empty
      if (curVal) {
        // Print the controls to the table
        document.getElementById(cookie).innerHTML = curVal;

        // Pass the controls into the config object
        inputAssignments[cookie] = [curVal.toLowerCase()];
      }
    });
  }

  // Get the autoRepeat cookie value
  const autoRepeat = getCookie('autoRepeat');

  // If the autoRepeat cookie value is not null
  if (autoRepeat !== null) {
    // Set the autoRepeatConfig value based on the autoRepeat cookie value
    autoRepeatConfig = parseInt(autoRepeat);
  }
}

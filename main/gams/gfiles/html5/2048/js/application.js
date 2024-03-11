// Import the necessary modules for the game application
// GameManager.js is responsible for managing the game logic
import GameManager from './GameManager.js';

// KeyboardInputManager.js handles user input from the keyboard
import KeyboardInputManager from './KeyboardInputManager.js';

// HTMLActuator.js manages rendering the game on the webpage
import HTMLActuator from './HTMLActuator.js';

// LocalStorageManager.js handles storing and retrieving game data from the browser's local storage
import LocalStorageManager from './LocalStorageManager.js';

// Wait for the browser to be ready to render the game
// This helps avoid visual glitches and ensures a smooth user experience
window.requestAnimationFrame(() => {
  // Create a new instance of the GameManager
  // Pass in the grid size (4x4) and the imported modules as arguments
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});


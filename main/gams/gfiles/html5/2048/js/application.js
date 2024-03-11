// Import the required modules
import GameManager from './GameManager.js';
import KeyboardInputManager from './KeyboardInputManager.js';
import HTMLActuator from './HTMLActuator.js';
import LocalStorageManager from './LocalStorageManager.js';

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(() => {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

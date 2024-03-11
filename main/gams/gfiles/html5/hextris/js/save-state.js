/**
 * Exports the current game state as a JSON string and saves it to the local storage.
 * The game state includes the main hex grid, blocks, score, wave generator,
 * gravity values, combo time, and high scores (if applicable).
 *
 * @returns {string} The JSON string representation of the game state.
 */
function exportSaveState() {
  const state = {
    hex: { ...MainHex }, // Shallow copy of the main hex grid
    blocks: blocks.map((block) => [...block].map((b) => ({ ...b, distFromHex: b.distFromHex / settings.scale }))), // Copy of blocks with adjusted distFromHex values
    score, // Current score
    wavegen: waveone, // Wave generator
    gdx,
    gdy,
    comboTime: settings.comboTime,
  };

  if (gameState === 1 || gameState === -1 || (gameState === 0 && localStorage.getItem('saveState'))) {
    state.highscores = highscores; // Include high scores if the game is over or if there's a saved state
  }

  localStorage.setItem('highscores', JSON.stringify(state.highscores)); // Save high scores separately

  return JSON.stringify(state); // Return the JSON string representation of the game state
}

/**
 * Sorts and saves the top 3 high scores to the local storage.
 */
function writeHighScores() {
  highscores.sort((a, b) => parseInt(a, 10) - parseInt(b, 10)).slice(0, 3); // Sort high scores in descending order and keep only the top 3
  localStorage.setItem("highscores", JSON.stringify(highscores)); // Save the sorted high scores
}

/**
 * Clears the saved game state from the local storage.
 */
function clearSaveState() {
  localStorage.setItem("saveState", null); // Set the saved state to null to clear it
}

/**
 * Checks if a saved game state exists in the local storage.

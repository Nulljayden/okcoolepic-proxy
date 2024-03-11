function exportSaveState() {
  const state = {
    hex: { ...MainHex },
    blocks: blocks.map((block) => [...block].map((b) => ({ ...b, distFromHex: b.distFromHex / settings.scale }))),
    score,
    wavegen: waveone,
    gdx,
    gdy,
    comboTime: settings.comboTime,
  };

  if (gameState === 1 || gameState === -1 || (gameState === 0 && localStorage.getItem('saveState'))) {
    state.highscores = highscores;
  }

  localStorage.setItem('highscores', JSON.stringify(state.highscores));

  return JSON.stringify(state);
}

function writeHighScores() {
  highscores.sort((a, b) => parseInt(a, 10) - parseInt(b, 10)).slice(0, 3);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function clearSaveState() {
  localStorage.setItem("saveState", null);
}

function isStateSaved() {
  return localStorage.getItem("saveState") !== null;
}

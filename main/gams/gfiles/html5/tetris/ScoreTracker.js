const BASE_LINES_PER_LEVEL = 5;

function TickerOutput() {
  this.lines = [];
}

TickerOutput.prototype.addLine = function(line) {
  this.lines.push(line);
};

TickerOutput.prototype.clear = function() {
  this.lines = [];
};

TickerOutput.prototype.toString = function() {
  return this.lines.join('\n');
};

function ScoreTracker(scoreOutput, linesOutput, levelOutput, tickerOutput) {
  this.level = 1;
  this.score = 0;
  this.linesRemaining = BASE_LINES_PER_LEVEL * this.level;

  this.scoreOutput = scoreOutput;
  this.linesOutput = linesOutput;
  this.levelOutput = levelOutput;
  this.tickerOutput = tickerOutput;

  this.curCombo = -1;
  this.lastWasBonus = false;
  this.backToBackCount = 0;

  this.isGameWon = false;

  this.outputScore();
  this.outputLines();
  this.outputLevel();
}

function linesCleared(config) {
  let linesCleared = 0;

  if (config.miniT) {
    linesCleared = 1 + (config.lines || 0);
  } else if (config.normalT) {
    linesCleared = config.lines || 0;
  } else if (config.lines > 0) {
    linesCleared = config.lines;
  }

  return linesCleared;
}

function scoreDiff(linesCleared, isBonus, level) {
  const baseScore = 100 * level;
  const bonusScore = 100 * level;

  let scoreDiff = baseScore * linesCleared;

  if (isBonus) {
    scoreDiff += bonusScore * linesCleared;
  }

  return scoreDiff;
}

ScoreTracker.prototype.updateScore = function(config) {
  const linesCleared = linesCleared(config);
  const isBonus = config.normalT || (config.lines === 4);
  const scoreDiff = scoreDiff(linesCleared, isBonus, this.level);

  this.curCombo += 1;
  const comboLines = Math.floor(this.curCombo * 0.5);
  const comboScore = 50 * this.curCombo * this.level;
  const linesClearedWithCombo = linesCleared + comboLines;

  this.linesRemaining -= linesClearedWithCombo;

  if (this.linesRemaining <= 0) {
    if (this.level < 15) {
      this.level += 1;
      this.linesRemaining = BASE_LINES_PER_LEVEL * this.level;
    } else {
      this.isGameWon = true;
    }
    this.outputLevel();
  }

  if (linesCleared > 0) {
    this.outputLines();
  }

  this.score += scoreDiff + comboScore;
  this.outputScore();

  const tickerLines = [];

  if (config.miniT) {
    tickerLines.push("T Spin Mini");
  } else if (config.normalT) {
    tickerLines.push(`T Spin ${['', 'Single', 'Double', 'Triple'][config.lines]}`);
  } else if (config.lines > 0) {
    tickerLines.push(`${['Single', 'Double', 'Triple', 'Tetris'][config.lines]}`);
  }

  if (this.curCombo >= 1) {
    tickerLines.push(`Combo x${this.curCombo}`);
  }

  if (this.lastWasBonus && isBonus) {
    tickerLines.push("Back-to-Back");
    this.backToBackCount += 1;
    const backToBackBonus = 0.5 * this.backToBackCount * scoreDiff;
    this.score += backToBackBonus;
    this.outputScore();
  }

  this.tickerOutput.addLine(tickerLines.join(' '));

  this.lastWasBonus = isBonus;
};

ScoreTracker.prototype.softDrop = function() {
  this.score += 1;
};

ScoreTracker.prototype.hardDrop = function(dist) {
  this.score += 2 * dist;
};

ScoreTracker.prototype.getLinesRemaining = function() { return this.linesRemaining; };
ScoreTracker.prototype.getScore = function() { return this.score; };
ScoreTracker.prototype.getLevel = function() { return this.level; };

ScoreTracker.prototype.getLevelPeriod = function() {
  const periods = [
    1000,
    800,
    600,
    470,
    380,
    250,
    200,
    160,
    130,
    90,
    50,
    27,
    20,
    15,
    10
  ];
  const res = periods[this.level < periods.length ? this.level : periods.length - 1];
  return res;
};

ScoreTracker.prototype.gameWon = function() {
  return this.isGameWon;
};

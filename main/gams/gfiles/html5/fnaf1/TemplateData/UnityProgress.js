function UnityProgress(gameInstance, progress) {
  // Check if gameInstance is a valid object
  if (typeof gameInstance !== 'object' || gameInstance === null) {
    console.error('gameInstance is not a valid object');
    return;
  }

  // Check if progress is a valid number between 0 and 1
  if (typeof progress !== 'number' || progress < 0 || progress > 1) {
    console.error('progress is not a valid number between 0 and 1');
    return;
  }

  // Get the splash screen style from the gameInstance
  const splashScreenStyle = gameInstance.Module.splashScreenStyle;

  // Get the container element
  const container = gameInstance.container;

  // Create the logo element if it doesn't exist
  if (!gameInstance.logo) {
    gameInstance.logo = createElementWithClass('div', `logo ${splashScreenStyle}`);
    container.appendChild(gameInstance.logo);
  }

  // Create the progress element if it doesn't exist
  if (!gameInstance.progress) {
    gameInstance.progress = createElementWithClass('div', `progress ${splashScreenStyle}`);
    const empty = createElementWithClass('div', 'empty');
    const full = createElementWithClass('div', 'full');
    gameInstance.progress.appendChild(empty);
    gameInstance.progress.appendChild(full);
    container.appendChild(gameInstance.progress);
  }

  // Set the width of the full and empty elements based on the progress value
  gameInstance.progress.full.style.width = `${progress * 100}%`;
  gameInstance.progress.empty.style.width = `${(1 - progress) * 100}%`;

  // Hide the logo and progress elements when progress reaches 100%
  if (progress === 1) {
    gameInstance.logo.style.display = 'none';
    gameInstance.progress.style.display = 'none';
  }
}

// Helper function to create an element with a class


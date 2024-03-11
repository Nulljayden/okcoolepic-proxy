// Function for updating the progress of a Unity game
function UnityProgress(gameInstance, progress) {
  // Check if the Module property exists in the gameInstance
  if (!gameInstance.Module)
    return;

  // Create the logo div if it doesn't already exist
  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
    gameInstance.container.appendChild(gameInstance.logo);
  }

  // Create the progress div if it doesn't already exist
  if (!gameInstance.progress) {
    gameInstance.progress = document.createElement("div");
    gameInstance.progress.className = "progress " + gameInstance.Module.splashScreenStyle;
    gameInstance.progress.empty = document.createElement("div");
    gameInstance.progress.empty.className = "empty";
    gameInstance.progress.appendChild(gameInstance.progress.empty);
    gameInstance.progress.full = document.createElement("div");
    gameInstance.progress.full.className = "full";
    gameInstance.progress.appendChild(gameInstance.progress.full);
    gameInstance.container.appendChild(gameInstance.progress);
  }

  // Update the width of the full and empty progress bars
  gameInstance.progress.full.style.width = (100 * progress) + "%";
  gameInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";

  // Hide the logo and progress bars when the progress reaches 100%
  if (progress == 1)
    gameInstance.logo.style.display = gameInstance.progress.style.display = "none";
}

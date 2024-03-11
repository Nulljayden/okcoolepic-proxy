// Create a loading screen using the createLoadingScreen method provided by pc.script
pc.script.createLoadingScreen(function (app) {
  // Define a function to show the splash screen
  const showSplash = function () {
    // Create a wrapper div for the splash screen
    const wrapper = document.createElement('div');
    wrapper.id = 'application-splash-wrapper';
    document.body.appendChild(wrapper); // Add the wrapper to the body of the document

    // Create the splash div
    const splash = document.createElement('div');
    splash.id = 'application-splash';
    wrapper.appendChild(splash); // Add the splash to the wrapper
    splash.style.display = 'none'; // Initially hide the splash

    // Add a logo to the splash
    const logo = document.createElement('img');
    logo.src = ASSET_PREFIX + 'logo.png';
    splash.appendChild(logo);
    logo.onload = function () {
      splash.style.display = 'block'; // Show the splash when the logo is loaded
    };

    // Create a container for the progress bar
    const container = document.createElement('div');
    container.id = 'progress-bar-container';
    splash.appendChild(container);

    // Create the progress bar
    const bar = document.createElement('div');
    bar.id = 'progress-bar';
    container.appendChild(bar);
  };

  // Define a function to hide the splash screen
  const hideSplash = function () {
    const splash = document.getElementById('application-splash-wrapper');
    splash.parentElement.removeChild(splash); // Remove the splash from the document
  };

  // Define a function to update the progress bar
  const setProgress = function (value) {
    const bar = document.getElementById('progress-bar');
    if (bar) {
      value = Math.min(1, Math.max(0, value)); // Clamp the value between 0 and 1
      bar.style.width = `${value * container.clientWidth}px`; // Update the width of the progress bar
    }
  };

  // Define a function to create the CSS for the loading screen
  const createCss = function () {
    const css = `
      body {
        background-color: #283538;
      }

      #application-splash-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #283538;
      }

      #application-splash {
        position: absolute;
        top: calc(50% - 28px);
        width: 264px;
        left: calc(50% - 132px);
      }

      #application-splash img {
        width: 100%;
      }

      #progress-bar-container {
        margin: 20px auto 0 auto;
        height: 2px;
        width: 100%;
        background-color: #1d292c;
      }

      #progress-bar {
        width: 0%;
        height: 100%;
        background-color: #f60;
      }
      @media (max-width: 480px) {
        #application-splash {
          width: 170px;
          left: calc(50% - 85px);
        }
      }
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    try {
      document.head.appendChild(style); // Add the style to the document head
      style.textContent = css;
    } catch (e) {
      console.error('Error adding style to document head:', e);
    }
  };

  let container;
  // Define a function to update the progress bar
  const updateProgress = function (value) {
    if (container) {
      setProgress(value);
    }
  };

  // Handle the preload end event
  const handlePreloadEnd = function () {
    app.off('preload:progress', handlePreloadProgress); // Remove the progress event listener
    window.requestAnimationFrame(() => {
      hideSplash(); // Hide the splash screen
    });
  };

  // Handle the preload progress event
  const handlePreloadProgress = function (value) {
    updateProgress(value); // Update the progress bar
  };

  // Create the CSS
  createCss();

  // Show the splash screen
  showSplash();

  // Handle the preload end event
  app.on('preload:end', handlePreloadEnd);
  // Handle the preload progress event
  app.on('preload:progress', handlePreloadProgress);
  // Handle the start

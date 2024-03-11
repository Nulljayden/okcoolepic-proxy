pc.script.createLoadingScreen(function (app) {
  const showSplash = function () {
    // splash wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'application-splash-wrapper';
    document.body.appendChild(wrapper);

    // splash
    const splash = document.createElement('div');
    splash.id = 'application-splash';
    wrapper.appendChild(splash);
    splash.style.display = 'none';

    const logo = document.createElement('img');
    logo.src = ASSET_PREFIX + 'logo.png';
    splash.appendChild(logo);
    logo.onload = function () {
      splash.style.display = 'block';
    };

    const container = document.createElement('div');
    container.id = 'progress-bar-container';
    splash.appendChild(container);

    const bar = document.createElement('div');
    bar.id = 'progress-bar';
    container.appendChild(bar);
  };

  const hideSplash = function () {
    const splash = document.getElementById('application-splash-wrapper');
    splash.parentElement.removeChild(splash);
  };

  const setProgress = function (value) {
    const bar = document.getElementById('progress-bar');
    if (bar) {
      value = Math.min(1, Math.max(0, value));
      bar.style.width = `${value * container.clientWidth}px`;
    }
  };

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
      document.head.appendChild(style);
      style.textContent = css;
    } catch (e) {
      console.error('Error adding style to document head:', e);
    }
  };

  let container;
  const updateProgress = function (value) {
    if (container) {
      setProgress(value);
    }
  };

  const handlePreloadEnd = function () {
    app.off('preload:progress', handlePreloadProgress);
    window.requestAnimationFrame(() => {
      hideSplash();
    });
  };

  const handlePreloadProgress = function (value) {
    updateProgress(value);
  };

  createCss();

  showSplash();

  app.on('preload:end', handlePreloadEnd);
  app.on('preload:progress', handlePreloadProgress);
  app.on('start', () => {
    window.requestAnimationFrame(() => {
      hideSplash();
    });
  });
});

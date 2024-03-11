(() => {
  const vendors = ['webkit', 'moz'];
  let requestAnimationFrame, cancelAnimationFrame;

  for (const vendor of vendors) {
    requestAnimationFrame = requestAnimationFrame || window[`${vendor}RequestAnimationFrame`];
    cancelAnimationFrame = cancelAnimationFrame || window[`${vendor}CancelAnimationFrame`] || window[`${vendor}CancelRequestAnimationFrame`];
  }

  if (!requestAnimationFrame) {
    const vendorsLength = vendors.length;
    requestAnimationFrame = (callback) => {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - (lastTime || currTime)));
      const id = setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      if (!lastTime) lastTime = currTime;
      return id;
    };
  }

  if (!cancelAnimationFrame) {
    cancelAnimationFrame = (id) => {
      clearTimeout(id);
    };
  }

  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
})();

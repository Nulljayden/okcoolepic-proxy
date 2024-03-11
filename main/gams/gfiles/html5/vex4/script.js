function inFrame() {
  // The inFrame function checks if the current page is displayed within a frame or not.
  // It does this by comparing the window.self and window.top objects.
  // If they are not equal, it means the page is in a frame.
  try {
    return window.self !== window.top;
  } catch (error) {
    // If an error occurs (e.g., in certain versions of Safari), it defaults to returning true.
    console.error(error);
    return true;
  }
}

// The pathNameStart variable stores the pathname of the current window's location,
// with the initial '/g' (if it exists) removed.
const pathName = window.location.pathname;
const pathNameStart = pathName.startsWith('/g') 
  ? pathName.substring(2) 
  : pathName;

// If the current page is not in a frame, it redirects to the pathNameStart.
if (!inFrame()) {
  window.location.replace(pathNameStart);
}


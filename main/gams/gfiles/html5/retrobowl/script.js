function inFrame() {
  // The inFrame function checks if the current page is displayed within a frame or not.
  // It does this by comparing the window.self and window.top objects.
  // If they are not equal, it means the page is in a frame.
  try {
    return window.self !== window.top;
  } catch (e) {
    // In some environments, directly comparing window.self and window.top may throw an exception.
    // In such cases, the function assumes that the page is in a frame and returns true.
    return true;
  }
}

if (!inFrame()) {
  // If the page is not in a frame, the following code redirects the user to a different URL.
  // The new URL is constructed by replacing the current page's pathname with a new one.
  // The new pathname starts with "/g" followed by the substring of the current pathname starting from the 5th character.
  window.location.replace(
    "/g" + window.location.pathname.substring(5)
  );
}

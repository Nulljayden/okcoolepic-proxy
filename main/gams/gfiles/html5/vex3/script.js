// This function, inFrame(), is used to check if the current page is opened within a frame or not.
function inFrame () {
  // The try-catch block is used to handle the case where the self and top properties are not available.
  // If the page is not in a frame, then the self and top properties refer to the same window object.
  // If the page is in a frame, then the self property refers to the current frame and the top property refers to the top-level window.
  try {
    return window.self !== window.top;
  } catch (e) {
    // If the self and top properties are not available, then it is assumed that the page is in a frame.
    return true;
  }
}

// This if statement checks if the page is not in a frame.
// If the page is not in a frame, then the window.location.replace() method is called to redirect the user to a new URL.
if(!inFrame()) {
  // The new URL is constructed by replacing the first 5 characters of the current pathname with "/g".
  // For example, if the current pathname is "/example", then the new URL will be "/g/example".
  window.location.replace("/g" + window.location.pathname.substring(5));
}


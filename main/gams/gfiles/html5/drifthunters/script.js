function inFrame() {
  try {
    return window.self !== window.top;
  } catch (error) {
    console.error(error);
    return true;
  }
}

const pathName = window.location.pathname;
const pathNameStart = pathName.startsWith('/g') ? pathName.substring(2) : pathName;

if (!inFrame()) {
  window.location.replace(pathNameStart);
}

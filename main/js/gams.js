const hash = location.hash;
if (hash) {
  const baseUrl = window.location.origin;
  const hashPath = hash.substring(1);
  const validPath = /^[a-zA-Z0-9/._-]+$/.test(hashPath);

  if (validPath) {
    const element = document.querySelector('.gam');
    if (element) {
      element.src = `${baseUrl}${hashPath}`;
    } else {
      console.warn('.gam element not found');
    }
  } else {
    console.error('Invalid hash path:', hashPath);
  }
}

(function() {
  var blob,
      domain,
      isHotlink,
      ref,
      ref1,
      ref2,
      ref3,
      uploadId,
      url;

  // Get the URL without the fragment identifier
  url = window.location.href.split('#')[0];

  // Get the domain from the URL
  ref = url.match(/\/\/([^\/]+)/);
  domain = ref ? ref[1] : undefined;

  // Get the upload ID from the URL
  ref1 = window.location.href;
  ref2 = ref1.match(/\/html\/(\d+)/);
  uploadId = ref2 ? ref2[1] : undefined;

  // Check if the page is a hotlink
  ref3 = document.location.href;
  isHotlink = ref3.match(/^https?:\/\/commondatastorage\.googleapis\.com\/itchio\//) ? true :
    domain && !(domain === 'itch.io' || domain.match(/\.itch\.io$/)) ? true : false;

  // Set isHotlink to false if it was not set by the previous condition
  isHotlink = isHotlink || false;

  // Send a beacon to the server with the domain and upload ID (if available)
  if (navigator.sendBeacon) {
    blob = new FormData();
    blob.append("domain", domain || "unknown-domain");
    if (uploadId) {
      blob.append("upload_id", uploadId);
    }
    if (isHotlink) {
      blob.append("hotlink", "1");
    }
    navigator.sendBeacon("https://itch.io/html-callback", blob);
  }

  // Redirect to the hotlink URL if the page is a hotlink
  if (isHotlink) {
    if (uploadId) {
      window.location = "https://itch.io/embed-hotlink/" + uploadId;
    } else {
      window.

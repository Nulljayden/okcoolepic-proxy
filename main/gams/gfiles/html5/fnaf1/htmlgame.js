(function() {
  // Initialize variables
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

  // Comment: Get the domain from the URL
  // This regular expression extracts the domain from the URL by matching two forward slashes followed by one or more characters that are not forward slashes.
  ref = url.match(/\/\/([^\/]+)/);
  domain = ref ? ref[1] : undefined;

  // Comment: Get the upload ID from the URL
  // This regular expression extracts the upload ID from the URL by matching the string '/html/' followed by one or more digits.
  ref1 = window.location.href;
  ref2 = ref1.match(/\/html\/(\d+)/);
  uploadId = ref2 ? ref2[1] : undefined;

  // Comment: Check if the page is a hotlink
  // This regular expression checks if the page is a hotlink by matching the URL against the Google Cloud Storage domain used by itch.io.
  ref3 = document.location.href;
  isHotlink = ref3.match(/^https?:\/\/commondatastorage\.googleapis\.com\/itchio\//) ? true :
    // If the domain is not itch.io or its subdomain, the page is considered a hotlink.
    domain && !(domain === 'itch.io' || domain.match(/\.itch\.io$/)) ? true : false;

  // Comment: Set isHotlink to false if it was not set by the previous condition
  isHotlink = isHotlink || false;

  // Comment: Send a beacon to the server with the domain and upload ID (if available)
  // If the browser supports the sendBeacon method, it sends a beacon to the server with the domain, upload ID, and hotlink status (if applicable) using the FormData interface.
  if (navigator.sendBeacon) {
    blob = new FormData();
    blob.append("domain", domain || "unknown-domain");
    if (uploadId) {
      blob.append("upload_id", upload_id);
    }
    if (

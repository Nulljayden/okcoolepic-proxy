// retrieves a file via XMLHttpRequest, calls fncCallback when done or fncError on error.
function XHR(strURL, fncCallback, ...args) {
  const oHTTP = new XMLHttpRequest();
  if (oHTTP) {
    oHTTP.open("GET", strURL, true);
    oHTTP.responseType = "text";
    oHTTP.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        fncCallback(this.response, ...args);
      } else {
        fncError(this.statusText);
      }
    };
    oHTTP.onerror = function() {
      fncError("Network error");
    };
    oHTTP.ontimeout = function() {
      fncError("Timeout error");
    };
    oHTTP.setRequestHeader("Content-Type", "text/plain");
    oHTTP.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    oHTTP.send();
  }
}

function setAttribs(...args) {
  if (args.length % 2 !== 0) {
    throw new Error("Invalid number of arguments");
  }
  for (let i = 0; i < args.length; i += 2) {
    this.setAttribute(args[i], args[i + 1]);
  }
  return this;
}

function setStyles(...args) {
  if (args.length % 2 !== 0) {
    throw new Error("Invalid number of arguments");
  }
  for (let i = 0; i < args.length; i += 2) {
    this.style[args[i]] = args[i + 1];
  }
  return this;

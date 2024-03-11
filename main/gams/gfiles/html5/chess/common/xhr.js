// retrieves a file via XMLHttpRequest, calls fncCallback when done or fncError on error.
function XHR(strURL, fncCallback, ...args) {
  // creates a new XMLHttpRequest object
  const oHTTP = new XMLHttpRequest();

  // opens the connection using the GET request on the provided URL
  if (oHTTP) {
    oHTTP.open("GET", strURL, true);

    // sets the response type to text
    oHTTP.responseType = "text";

    // callback function for the onload event
    oHTTP.onload = function() {
      // checks if the status code is between 200 and 400 (success)
      if (this.status >= 200 && this.status < 400) {
        // calls the provided callback function with the response and any additional arguments
        fncCallback(this.response, ...args);
      } else {
        // calls the error function with the error message
        fncError(this.statusText);
      }
    };

    // callback function for the onerror event
    oHTTP.onerror = function() {
      // calls the error function with the error message
      fncError("Network error");
    };

    // callback function for the ontimeout event
    oHTTP.ontimeout = function() {
      // calls the error function with the error message
      fncError("Timeout error");
    };

    // sets the Content-Type header to text/plain
    oHTTP.setRequestHeader("Content-Type", "text/plain");

    // sets the If-Modified-Since header to a past date
    oHTTP.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");

    // sends the request
    oHTTP.send();
  }
}




// sets multiple attributes on

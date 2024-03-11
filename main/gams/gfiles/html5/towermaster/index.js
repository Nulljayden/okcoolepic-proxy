// Importing required modules
const express = require('express'); // Web framework for Node.js
const path = require('path'); // Provides utilities for working with file and directory paths
const opn = require('opn'); // A utility for opening URLs in the user's default browser

// Creating an Express application instance
const app = express();

// Setting the port number for the server to listen on
const port = 8082;

// Defining the base URL for the server
const host = `http://localhost:${port}`;

// Middleware for serving static files from the 'assets' directory
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

// Middleware for serving static files from the 'dist' directory
app.use('/dist', express.static(path.join(process.cwd(), 'dist')));

// Middleware for handling all GET requests
app.get('*', (req, res) => {
  // Sending the 'index.html' file as the response for all GET requests
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  // Logging a message indicating that the server has started
  console.log(`Server started at ${host}`);

  // Attempting to open the server URL in the user's default browser
  opn(host)
    .catch((err) => {
      // Logging an error message if there was a problem opening the URL
      console.error(`Failed to open ${host} in the default browser: ${err}`);
    });
});


#!/bin/bash

# This is a function named 'web' that starts the web development server using npm.
web() {
  # Check if npm is installed on the system. If it is, proceed to the next check.
  if [ -x "$(command -v npm)" ]; then
    
    # Check if there is a 'package.json' file in the 'web' directory.
    # If it exists, proceed to install the dependencies and start the server.
    if [ -d "web/package.json" ]; then
      cd web

      # Install the dependencies listed in 'package.json' using npm.
      npm install

      # Start the web development server using npm start command.
      npm start

      # Navigate back to the parent directory after the server has started.
      cd ..
    else
      # If 'package.json' is not found in the 'web' directory, print the following message.
      echo "No package.json found in web directory"
    fi
  else
    # If npm is not found on the system, print the following message.
    echo "npm not found, please install it first"
  fi
}

# Call the 'web' function to start the web development server.
web


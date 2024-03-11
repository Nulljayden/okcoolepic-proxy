#!/bin/bash

# Start the web development server using npm
web() {
  if [ -x "$(command -v npm)" ]; then
    if [ -d "web/package.json" ]; then
      cd web
      npm install
      npm start
      cd ..
    else
      echo "No package.json found in web directory"
    fi
  else
    echo "npm not found, please install it first"
  fi
}

# Call the web function
web


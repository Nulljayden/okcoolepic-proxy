// Import various modules required for the application
import * as combat from "combat/combat.js"; // Handles combat-related functionality
import * as map from "ui/map/map.js"; // Manages map-related functionality
import * as log from "ui/log.js"; // Controls logging functionality
import * as status from "ui/status.js"; // Manages status-related functionality

// Import UI components
import * as intro from "ui/intro/intro.js"; // Displays the introduction screen
import * as actors from "util/actors.js"; // Handles actor-related functionality

// Import the player character and level generator modules
import pc from "being/pc.js"; // Represents the player character
import { generate } from "level/generator.js"; // Generates the game levels

// Set the random number generator seed based on the current date and time
let seed = Date.now();
console.log("seed", seed);
ROT.RNG.setSeed(seed); // Set the seed for the ROT.js random number generator

// Cache the DOM elements for the map and intro screens
let mapElement: HTMLElement | null = document.querySelector("#map");
let introElement: HTMLElement | null = document.querySelector("#intro");

// Initialization function called when the application starts
async function init() {
  // Check if the required DOM elements are available
  if (!mapElement || !introElement) {
    throw new Error("Map or intro element not found");
  }

  // Initialize the map, combat, log, and status components
  map.init(mapElement);
  combat.init(document.querySelector("#combat"));
  log.init(document.querySelector("#log"));
  status.init(document.querySelector("#status"));

  // Update the status component
  status.update();

  // Add introductory log messages
  log.add("A truly beautiful day for a heroic action!");
  log.add("This tower is surrounded by plains and trees and there might be a princess sleeping on the last floor.");
  log.pause(); // Pause the log to allow the user

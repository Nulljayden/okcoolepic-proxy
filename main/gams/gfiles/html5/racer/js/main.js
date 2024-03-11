// Game variables
// --------------

// fps: The number of frames per second.
var fps = 60;                      // how many 'update' frames per second

// step: The length of each frame in seconds.
var step = 1 / fps;               // how long is each frame (in seconds)

// width and height: The logical canvas dimensions.
var width = 1024;                    // logical canvas width
var height = 768;                     // logical canvas height

// centrifugal: The centrifugal force multiplier when going around curves.
var centrifugal = 0.3;                 // centrifugal force multiplier when going around curves

// offRoadDecel: The speed multiplier when off road.
var offRoadDecel = 0.99;                // speed multiplier when off road (e.g. you lose 2% speed each update frame)

// skySpeed, hillSpeed, and treeSpeed: The scroll speeds for the background layers.
var skySpeed = 0.001;                  // background sky layer scroll speed when going around curve (or up hill)
var hillSpeed = 0.002;                 // background hill layer scroll speed when going around curve (or up hill)
var treeSpeed = 0.003;                 // background tree layer scroll speed when going around curve (or up hill)

// skyOffset, hillOffset, and treeOffset: The current scroll offsets for the background layers.
var skyOffset = 0;                    // current sky scroll offset
var hillOffset = 0;                   // current hill scroll offset
var treeOffset = 0;                   // current tree scroll offset

// segments and cars: Arrays to store road segments and cars.
var segments = [];                   // array of road segments
var cars = [];                       // array of cars on the road

// stats: A mr.doobs FPS counter.
var stats = Game.stats('fps');       // mr.doobs FPS counter

// canvas and ctx: The canvas and its drawing context.
var canvas = Dom.get('canvas');       // our canvas...
var ctx = canvas.getContext('2d');    // ...and its drawing context

// background and sprites: The background image and spritesheet.
var background = null;                // our background image (loaded below)
var sprites = null;                   // our spritesheet (loaded below)

// resolution: The scaling factor for resolution independence.
var resolution = null;                 // scaling factor to provide resolution independence (computed)

// roadWidth, segmentLength, rumbleLength, trackLength, lanes, fieldOfView, cameraHeight, cameraDepth, drawDistance, playerX, playerZ, fogDensity, position, speed, maxSpeed, accel, breaking, decel, offRoadDecel, offRoadLimit, and totalCars:
// Additional game variables.

// hud: An object containing the speed, current_lap_time, last_lap_time, and fast_lap_time values and their corresponding DOM elements.
var hud = {
  speed: { value: null, dom: Dom.get('speed_value') },
  current_lap_time: { value: null, dom: Dom.get('current_lap_time_value') },
  last_lap_time: { value: null, dom: Dom.get('last_lap_time_value') },
  fast_lap_time: { value: null, dom: Dom.get('fast_lap_time_value') }
};

// update and render functions
// ---------------------------

// update: The function to update the game world.
function update(dt) {
  // ...
}

// render: The function to render the game world.
function render() {
  // ...
}

// findSegment: A function to find the road segment at a given z position.
function findSegment(z) {
  // ...
}

// resetRoad: A function to reset the road and its properties.
function resetRoad() {
  // ...
}

// addSegment: A function to add a new road segment with the specified curve and y values.
function addSegment(curve, y) {
  // ...
}

// addSprite: A function to add a new sprite to a road segment.
function addSprite(n, sprite, offset) {
  // ...
}

// addRoad: A function to add a road section with specified length, hill, and curve properties.
function addRoad(enter, hold, leave, curve, y) {
  // ...
}

// ROAD: An object containing length, hill, and curve constants for road generation.
var ROAD = {
  LENGTH: { NONE: 0, SHORT: 25, MEDIUM: 50, LONG: 100 },
  HILL: { NONE: 0, LOW: 20, MEDIUM: 40, HIGH: 60 },
  CURVE: { NONE: 0, EASY: 2, MEDIUM: 4, HARD: 6 }
};

// addStraight, addHill, addCurve, addLowRollingHills, addSCurves, addBumps, and addDownhillToEnd:
// Functions to generate specific road patterns.

// Game Loop
// ---------

// Game.run: The main game loop function.
Game.run({
  // ...
});

// reset: A function to reset game settings and road.
function reset(options) {
  // ...
}

// refreshTweakUI: A function to update the values in the Tweak UI section.
function refreshTweakUI() {
  // ...
}

// Dom.on: Event listeners for Tweak UI elements to update game settings.
Dom.on('resolution', 'change', function(ev) {
  // ...
});

Dom.on('lanes', 'change', function(ev) {
  // ...
});

Dom.on('roadWidth', 'change', function(ev) {
  // ...
});

Dom.on('cameraHeight', 'change', function(ev) {
  // ...
});

Dom.on('drawDistance', 'change', function(ev) {

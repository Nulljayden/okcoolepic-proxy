import Board from "./board.js";
import XY from "util/xy.js";

import * as ui from "ui/combat.js";
import * as keyboard from "util/keyboard.js";
import * as map from "ui/map/map.js";
import * as log from "ui/log.js";

import pc from "being/pc.js";
import { ATTACK_1, ATTACK_2, MAGIC_1, MAGIC_2 } from "./types.js";

// An array of words representing the increasing severity of damage
const AMOUNTS = ["slightly", "moderately", "severely", "critically"].reverse();

// A flag to track if the tutorial has been shown
let tutorial = false;

// The game board instance
let board = new Board().randomize();

// A promise that is resolved when the combat sequence ends
let resolve = null;

// The enemy combatant
let enemy = null;

// The current cursor position on the game board
let cursor = new XY(0, 0);

// Function to end the combat sequence
function end() {
	// Reactivate the map UI
	map.activate();

	// Zoom the map back to its original state
	map.zoomOut();

	// Deactivate the combat UI
	ui.deactivate();

	// Remove the event listener for key events
	keyboard.pop();

	// Resolve the combat promise
	resolve();
}

// Function to handle damage calculation and logging for combat
function doDamage(attacker, defender, options = {}) {
	// Check if the attacker has enough mana for a magic attack
	if (options.isMagic && attacker.mana < options.power) {
		log.add("%The %{verb,do} not have enough mana to attack.", attacker, attacker);
		return;
	}

	// Calculate the attack and defense values
	let attack = attacker.getAttack();
	let defense = defender.getDefense();
	let damage = attack + options.power - defense;

	// Ensure the damage is at least 1
	damage = Math.max(1, damage);

	// Construct the log message based on the attack type and damage
	let verb = (options.isMagic ? "%{verb,cast} a spell at %the" : "%{verb,hit} %the").format(attacker, defender);
	let newHP = Math.max(0, defender.hp-damage);
	if (newHP > 0) {
		let frac = newHP/defender.maxhp; // >0, < maxhp
		let amount = AMOUNTS[Math.floor(frac * AMOUNTS.length)];
		log.add(`%The ${verb} and ${amount} %{verb,damage} %it.`, attacker, attacker, defender);
	} else {
		log.add(`%The ${verb} and %{verb,kill} %it!`, attacker, attacker, defender);
	}

	// Update the defender's HP
	defender.adjustStat("hp", -damage);

	// Check if the defender is dead and end the combat if so
	if (defender.hp <= 0) { end(); }
}

// Function to handle the activation of a segment on the game board
function activate(xy) {
	let segment = board.findSegment(xy);
	if (!segment || segment.length < 2) { return; }

	// Clear the segment from the game board
	segment.forEach(xy => {
		board.set(xy, null);
	});

	// Start the animation for the segment falling
	let animation = board.fall();
	animation.start(drawFast).then(() => {
		checkSegments();
		drawFull();
	});

	// Calculate the power, attacker, and defender based on the segment value
	let power = segment.length;
	let isMagic = (segment[0].value == MAGIC_1 || segment[0].value == MAGIC_2);
	let attacker = pc;
	let defender = enemy;
	if (segment[0].value == ATTACK_2 || segment[0].value == MAGIC_2) {
		attacker = enemy;
		defender = pc;
	}

	// Perform the damage calculation with the appropriate options
	doDamage(attacker, defender, {power, isMagic});
}

// Function to check for any full segments on the game board
function checkSegments() {
	while (1) {
		let segments = board.getAllSegments();
		if (segments[0].length >= 2) { return; }
		board.randomize();
	} 
}

// Function to handle key events during combat
function handleKeyEvent(e) {
	// Check if the Enter key was pressed
	if (keyboard.isEnter(e)) {
		// Activate the segment at the current cursor position
		return activate(cursor);
	}

	// Get the direction from the key event
	let dir = keyboard.getDirection(e);

	// If no direction was found, return early
	if (!dir) { return; }

	// Scale the direction and update the cursor position
	dir = dir.scale(1, -1);
	cursor = cursor.plus(dir).mod(board.getSize());

	// Redraw the game board with the updated cursor position
	drawFull();
}

// Function to quickly redraw the game board
function drawFast() {
	// Draw the game board and cursor
	ui.draw(board, cursor);
}

// Function to fully redraw the game board
function drawFull() {
	// Find the segment at the current cursor position
	let highlight = board.findSegment(cursor);

	// If the segment is too short, clear the highlight
	if (highlight

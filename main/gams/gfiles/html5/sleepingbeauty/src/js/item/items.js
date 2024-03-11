// Import necessary classes and modules
import Item, {Wearable, Drinkable} from "./item.js";
import * as pubsub from "util/pubsub.js";
import * as log from "ui/log.js";
import * as rules from "rules.js";

// Define a constant object for weapon prefixes and their corresponding values
const WEAPON_PREFIXES = {
	"sharp": +1,
	"blunt": -1,
	"epic": 2
};

// Define a constant object for shield prefixes and their corresponding values
const SHIELD_PREFIXES = {
	"small": -1,
	"large": 1,
	"tower": 2
};

// Define a constant object for armor prefixes and their corresponding values
const ARMOR_PREFIXES = {
	"leather": 1,
	"iron": 2,
	"tempered": 3
};

// Define the Dagger class that extends Wearable
export class Dagger extends Wearable {
	// Constructor with the required parameters
	constructor() {
		super("weapon", {ch:"(", fg:"#ccd", name:"dagger"}, 1, WEAPON_PREFIXES);
	}
}
// Set the danger level for the Dagger class
Dagger.danger = 1;

// Define the Sword class that extends Wearable
export class Sword extends Wearable {
	// Constructor with the required parameters
	constructor() {
		super("weapon", {ch:"(", fg:"#dde", name:"sword"}, 2, WEAPON_PREFIXES);
	}
}
// Set the danger level for the Sword class
Sword.danger = 2;

// Define the Axe class that extends Wearable
export class Axe extends Wearable {
	// Constructor with the required parameters
	constructor() {
		super("weapon", {ch:")", fg:"#ccd", name:"axe"}, 3, WEAPON_PREFIXES);
	}
}
// Set the danger level for the Axe class
Axe.danger = 3;

// Define the Mace class that extends Wearable
export class Mace extends Wearable {
	// Constructor with the required parameters
	constructor() {
		super("weapon", {ch:")", fg:"#bbc", name:"mace"}, 3, WEAPON_PREFIXES);
	}
}
// Set the danger level for the Mace class
Mace.danger = 4;

// Define the GreatSword class that extends Wearable
export class GreatSword extends Wearable {
	// Constructor with the required parameters
	constructor() {
	

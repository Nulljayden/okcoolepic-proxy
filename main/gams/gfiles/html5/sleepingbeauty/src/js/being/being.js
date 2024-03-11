// Import required modules
import XY from "util/xy.js";
import Entity, { BLOCKS_MOVEMENT } from "entity.js";
import Inventory from "./inventory.js";
import * as actors from "util/actors.js";
import * as cells from "level/cells.js";

// Initialize pronouns array
const IT = ["it", "her", "him"];

// Define the Being class that extends Entity class
export default class Being extends Entity {
  constructor(visual) {
    // Call Entity class constructor
    super(visual);

    // Initialize inventory
    this.inventory = new Inventory();

    // Set blocks property to BLOCKS_MOVEMENT constant
    this.blocks = BLOCKS_MOVEMENT;

    // Initialize _xy and _level properties
    this._xy = null;
    this._level = null;

    // Set attack, defense, sex, hp, and mana properties
    this.attack = 10;
    this.defense = 10;
    this.sex = 0;
    this.hp = this.maxhp = 20;
    this.mana = this.maxmana = 50;
  }

  // Getter for _xy property
  getXY() {
    return this._xy;
  }

  // Getter for _level property
  getLevel() {
    return this._level;
  }

  // Getter for attack property with inventory modifier
  getAttack() {
    let modifier = this.inventory.getItems().reduce((acc, item) => {
      return acc + (item.modifies == "attack" ? item.modifier : 0);
    }, 0);
    return this.attack + modifier;
  }

  // Getter for defense property with inventory modifier
  getDefense() {
    let modifier = this.inventory.getItems().reduce((acc, item) => {
      return acc + (item.modifies == "defense" ? item.modifier : 0);
    }, 0);
    return this.defense + modifier;
  }

  // Method to adjust a stat by a given difference
  adjustStat(stat, diff) {
    this[stat] += diff;
    this[stat] = Math.max(this[stat], 0);
    this[stat] = Math.min(this[stat], this[`max${stat}`]);
    if (stat == "hp" && this[stat] == 0) {
      this.die();
    }
  }

  // Method to handle death of the being
  die() {
    let level = this._level;
    let xy = this._xy;

    // Remove the being from the old position
    this.moveTo(null);

    // Remove the being from the level
    actors.remove(this);

    // Drop items from inventory if on a floor
    let items = this.inventory.getItems();
    if (items.length > 0 && level.getEntity(xy) instanceof cells.Floor) {
      let item = items.random();
      this.inventory.removeItem(item);
      level.setItem(xy, item);
    }
  }

  // Method to perform an action
  act() {
    return Promise.resolve();
  }

  // Method to move the being by a given delta
  moveBy(dxy) {
    return this.moveTo(this._xy.plus(dxy

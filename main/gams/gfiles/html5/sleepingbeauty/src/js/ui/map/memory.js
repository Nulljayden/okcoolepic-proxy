import * as cells from "level/cells.js";
import pc from "being/pc.js";
import ROT from "rot-js";

const GRASS_1 = new cells.Grass("\"");
const GRASS_2 = new cells.Grass("'");
const TREE = new cells.Tree();

const NOISE = new ROT.Noise.Simplex();

const memories = {};

function darken(color) {
  if (!color) {
    return color;
  }
  const rgb = ROT.Color.fromString(color);
  if (rgb.r.constructor !== Number || rgb.g.constructor !== Number || rgb.b.constructor !== Number) {
    throw new Error('Invalid color format');
  }
  return ROT.Color.toRGB(ROT.Color.fromString(color).map(x => Math.floor(x/2)));
}

export default class Memory {
  static forLevel(level) {
    if (level.constructor !== Object) {
      throw new Error('Level parameter must be an object');
    }
    if (!(level.id in memories)) {
      memories[level.id] = new this(level);
    }
    return memories[level.id];
  }

  constructor(level) {
    this._level = level;
    this._memo

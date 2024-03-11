import XY from "util/xy.js";
import { RATIO } from "conf.js";
import { clear, add } from "util/actors.js";
import { publish } from "util/pubsub.js";
import { WALL, ROOM, CORRIDOR, Door } from "./cells.js";
import { logAdd, logPause, logFmt } from "ui/log.js";
import { isEscape } from "util/keyboard.js";

const RADII = [15, 30, 20, 10];

export function dangerToRadius(danger: number): number {
  if (danger < 2 || danger > RADII.length + 1) {
    throw new Error(`Invalid danger level: ${danger}`);
  }
  if (danger === RADII.length + 1) {
    return RADII[RADII.length - 1];
  }
  const diff = RADII[RADII.length - 1] - RADII[RADII.length - 2];
  const regularCount = RADII.length - 2;
  return RADII[danger - 2] + Math.round((danger - 2) / (regularCount - 1) * diff);
}

export default class Level {
  constructor(
    public danger: number,
    public rooms: Room[],
    public start?: XY,
    public end?: XY,
    public beings: { [key: string]: Being } = {},
    public items: { [key: string]: Item } = {},
    public cells: { [key: string]: Cell } = {}
  ) {}

  activate(xy: XY, who: Being): Promise<void> {
    clear();

    who.moveTo(null); // remove from old
    map.setLevel(this);
    who.moveTo(xy, this); // put to new

    const beings = Object.values(this.beings).filter(b => b);
    beings.forEach(being => add(being));

    publish("status-change");

    if (this.danger === RADII.length + 1) {
      return this._outro(who);
    } else {
      logAdd(`Welcome to tower floor ${this.danger}.`);
      return Promise.resolve();
    }
  }

  isInside(xy: XY): boolean {
    xy = xy.scale(1, RATIO);
    return xy.norm() < dangerToRadius(this.danger);
  }

  isOutside(xy: XY): boolean {
    xy = xy.scale(1, RATIO);
    return xy.norm() > dangerToRadius(this.danger) + 2;
  }

  trim(): void {
    Object.keys(this.cells).forEach(key => {
      const xy = XY.fromString(key);
      if (!this.isInside(xy)) { delete this.cells[key]; }
    });
  }

  fits(room: Room): boolean {
    const xy = new XY();

    for (xy.x = room.lt.x; xy.x <= room.rb.x; xy.x++) {
      for (xy.y = room.lt.y; xy.y <= room.rb.y; xy.y++) {
        const key = xy.toString();
        if (key in this.cells) { return false; }
      }
    }

    return true;
  }

  getEntity(xy: XY): Cell {
    const key = xy.toString();
    return this.beings[key] || this.items[key] || this.cells[key] || WALL;
  }

  setCell(xy: XY, cell: Cell): void {
    this.cells[xy] = cell;
  }

  getCell(xy: XY): Cell {
    return this.cells[xy] || WALL;
  }

  getItem(xy: XY): Item | undefined {
    return this.items[xy];
  }

  setBeing(xy: XY, being: Being): void {
    this.beings[xy] = being;
    publish("visual-change", this, { xy });
  }

  setItem(xy: XY, item: Item): void {
    this.items[xy] = item;
    publish("visual-change", this, { xy });
  }

  carveRoom(room: Room): void {
    this.rooms.push(room);
    const xy = new XY();

    for (xy.x = room.lt.x; xy.x <= room.rb.x; xy.x++) {
      for (xy.y = room.lt.y; xy.y <= room.rb.y; xy.y++) {
        this.setCell(xy, ROOM);
      }
    }
  }

  carveCorridor(xy1: XY, xy2: XY): void {
    const diff = xy2.minus(xy1);
    const steps = diff.norm8() + 1;

    for (let i = 0; i <= steps; i++) {
      const xy = xy1.lerp(xy2, i / steps).floor();
      this.setCell(xy,

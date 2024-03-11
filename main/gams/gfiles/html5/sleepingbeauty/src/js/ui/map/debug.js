import XY from "util/xy.js";
import { dangerToRadius } from "level/level.js";

const CELL = new XY(8, 12);

function drawCell(ctx, xy, color = "#000") {
  if (!ctx || !xy || !color) {
    console.error("Invalid arguments passed to drawCell function");
    return;
  }

  if (color.length !== 7 || color.charAt(0) !== "#") {
    console.error("Invalid color passed to drawCell function");
    return;
  }

  ctx.fillStyle = color;
  ctx.fillRect(xy.x, xy.y, CELL.x - 1, CELL.y - 1);
}

export function draw(level) {
  if (!level) {
    console.error("Invalid level passed to draw function");
    return;
  }

  let canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  let ctx;
  try {
    ctx = canvas.getContext("2d");
  } catch (error) {
    console.error("Error getting 2D context of canvas", error);
    return;
  }

  let radius;
  try {
    radius = dangerToRadius(level.danger);
  } catch (error) {
    console.error("Error getting danger radius from level", error);
    return;
  }

  let offset = new XY(1.5 * radius, 1 * radius).round();
  if (!offset || !radius) {
    console.error("Error calculating offset

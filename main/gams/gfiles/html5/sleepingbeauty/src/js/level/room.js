import ROT from "rot-js";
import XY from "util/xy.js";

const DIST = 10;

/// Returns a random room size with width between 2 and 5
function generateRoomSize(): XY {
  const width = 2 + ROT.RNG.getUniformInt(3);
  const height = width + ROT.RNG.getUniformInt(-1, 1);
  return new XY(width, height);
}

/// Clones a room object
function cloneRoom(room: Room): Room {
  return {
    neighbors: [...room.neighbors],
    lt: room.lt.clone(),
    rb: room.rb.clone(),
    center: room.center.clone(),
  };
}

/// Creates a centered room with the given half size
function createCenteredRoom(halfSize: XY): Room {
  return {
    neighbors: [],
    center: new XY(0, 0),
    lt: halfSize.scale(-1),
    rb: halfSize.scale(1),
  };
}

/// Creates a room near the given xy coordinate
function createRoomNearTo(xy: XY): Room {
  const cx = xy.x + ROT.RNG.getUniformInt(-DIST, DIST);
  const cy = xy.y + ROT.RNG.getUniformInt(-DIST, DIST);
  const center = new XY(cx, cy);

  const size = generateRoomSize();

  return {
    neighbors: [],
    center,
    lt: center.minus(size.scale(0.5)),
    rb: center.plus(size.scale(0.5)),
  };

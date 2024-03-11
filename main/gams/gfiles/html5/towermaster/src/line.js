import { getMoveDownValue, getLandBlockVelocity } from './utils'
import * as constant from './constant'

/**
 * This function handles the actions for the line object in the game.
 * It sets the initial position of the line when it's not ready,
 * moves the line downwards based on the moveDownMovement variable,
 * and updates the position of the line and its collision point based on the landBlockVelocity.
 * @param {Object} instance - The line object to be updated.
 * @param {Object} engine - The game engine that contains the game state and utility functions.
 * @param {number} time - The current time in the game.
 */
export const lineAction = (instance, engine, time) => {
  const i = instance
  if (!i.ready) {
    // Set the initial position of the line
    i.y = engine.getVariable(constant.lineInitialOffset)
    i.ready = true
    i.collisionX = engine.width - engine.getVariable(constant.blockWidth)
  }
  engine.getTimeMovement(
    constant.moveDownMovement,
    [[instance.y, instance.y + (getMoveDownValue(engine, { pixelsPerFrame: s => s / 2 }))]],
    (value) => {
      instance.y = value
    },
    {
      name: 'line'
    }
  )
  // Get the land block velocity and update the position of the line and its collision point
  const landBlockVelocity = getLandBlockVelocity(engine, time)
  instance.x += landBlockVelocity
  instance.collisionX += landBlockVelocity
}

/**
 * This function paints the line object on the canvas.
 * It only executes when the debug mode is enabled.
 * @param {Object} instance - The line object to be painted.
 * @param {Object} engine - The game engine that contains the canvas context.
 */
export const linePainter = (instance, engine) => {
  const { ctx, debug } = engine
  if (!debug) {
    return
  }
  ctx.save

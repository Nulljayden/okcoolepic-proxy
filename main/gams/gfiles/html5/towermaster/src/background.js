import { checkMoveDown, getMoveDownValue } from './utils'
import * as constant from './constant'

// Function to draw the background image with a parallax effect
export const backgroundImg = (engine) => {
  // Get the background image object from the engine
  const bg = engine.getImg('background')
  // Get the width and height of the background image
  const bgWidth = bg.width
  const bgHeight = bg.height
  // Calculate the zoomed height based on the engine width and background aspect ratio
  const zoomedHeight = (bgHeight * engine.width) / bgWidth
  // Get the current offset height from the engine variable or set it to the bottom of the canvas
  let offsetHeight = engine.getVariable(constant.bgImgOffset, engine.height - zoomedHeight)
  // Check if the offset height is greater than the canvas height and return if true
  if (offsetHeight > engine.height) {
    return
  }
  // Function to handle the movement of the background image
  engine.getTimeMovement(
    constant.moveDownMovement, // Movement identifier
    [[offsetHeight, offsetHeight + (getMoveDownValue(engine, { pixelsPerFrame: s => s / 2 }))]], // Array of start and end values for the offset height
    (value) => { // Callback function to update the offset height
      offsetHeight = value
    },
    {
      name: 'background' // Identifier for the movement
    }
  )
  // Function to handle the initial movement of the background image
  engine.getTimeMovement(
    constant.bgInitMovement,
    [[offsetHeight, offsetHeight + (zoomedHeight / 4)]],
    (value) => {
      offsetHeight = value
    }
  )
  // Set the offset height as an engine variable
  engine.setVariable(constant.bgImgOffset, offsetHeight)
  // Set the initial line offset as an engine variable
  engine.setVariable(constant.lineInitialOffset, engine.height - (zoomedHeight * 0.394))
  // Draw the background image on the canvas with the calculated offset and zoomed height
  engine.ctx.drawImage(
    bg,
    0, offsetHeight,
    engine.width, zoomedHeight
  )
}

// Function to calculate the linear gradient color based on the given parameters
const getLinearGradientColorRgb = (colorArr, colorIndex, proportion) => {
  // Calculate the current and next color index
  const currentIndex = colorIndex + 1 >= colorArr.length ? colorArr.length - 1 : colorIndex
  const colorCurrent = colorArr[currentIndex]
  const nextIndex = currentIndex + 1 >= colorArr.length - 1 ? currentIndex : currentIndex + 1
  const colorNext = colorArr[nextIndex]
  // Function to calculate the RGB value based on the proportion
  const calRgbValue = (index) => {
    const current = colorCurrent[index]
    const next = colorNext[index]
    return Math.round(current + ((next - current) * proportion))
  }
  // Return the calculated RGB color as a string
  return `rgb(${calRgbValue(0)}, ${calRgbValue(1)}, ${calRgbValue(2)})`
}

// Function to draw the background with a linear gradient
export const backgroundLinearGradient = (engine) => {
  // Create a linear gradient object on the canvas context
  const grad = engine.ctx.createLinearGradient(0, 0, 0, engine.height)
  // Define the array of color stops
  const colorArr = [
    [200, 255, 150],
    [105, 230, 240],
    [90, 190, 240],
    [85, 100, 190],
    [55, 20, 35],
    [75, 25, 35],
    [25, 0, 10]
  ]
  // Get the current offset height from the engine variable
  const offsetHeight = engine.getVariable(constant.bgLinearGradientOffset, 0)
  // Check if the movement is down and update the offset height if true
  if (checkMoveDown(engine)) {
    engine.setVariable(
      constant.bgLinearGradientOffset
      , offsetHeight + (getMoveDownValue(engine) * 1.5)
    )
  }
  // Calculate the color index and proportion based on the offset height
  const colorIndex = parseInt(offsetHeight / engine.height, 10)
  const calOffsetHeight = offsetHeight % engine.height
  const proportion = calOffsetHeight / engine.height
  // Calculate the base and top color for the linear gradient
  const colorBase = getLinearGradientColorRgb(colorArr, colorIndex, proportion)
  const colorTop = getLinearGradientColorRgb(colorArr, colorIndex + 1, proportion)
  // Add color stops to the gradient object
  grad.addColorStop(0, colorTop)
  grad.addColorStop(1, colorBase)
  // Set the fill style to the gradient object
  engine.ctx.fillStyle = grad
  // Begin a

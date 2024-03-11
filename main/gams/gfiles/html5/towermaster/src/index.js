import { Engine, Instance } from 'cooljs'
import { touchEventHandler } from './utils'
import { background } from './background'
import { lineAction, linePainter } from './line'
import { cloudAction, cloudPainter } from './cloud'
import { hookAction, hookPainter } from './hook'
import { tutorialAction, tutorialPainter } from './tutorial'
import * as constant from './constant'
import { startAnimate, endAnimate } from './animateFuncs'

const gameFactory = (option = {}) => {
  const {
    width = 750,
    height = 1334,
    canvasId = 'gameCanvas',
    soundOn = true
  } = option

  const game = new Engine({
    canvasId,
    highResolution: true,
    width,
    height,
    soundOn
  })

  const pathGenerator = (path) => `./assets/${path}`

  const backgroundImg = new Image()
  backgroundImg.src = pathGenerator('background.png')

  const hookImg = new Image()
  hookImg.src = pathGenerator('hook.png')

  const blockRopeImg = new Image()
  blockRopeImg.src = pathGenerator('block-rope.png')

  const blockImg = new Image()
  blockImg.src = pathGenerator('block.png')

  const blockPerfectImg = new Image()
  blockPerfectImg.src = pathGenerator('block-perfect.png')

  const clouds = []
  for (let i = 1; i <= 4; i += 1) {
    const cloud = new Instance({
      name: `cloud_${i}`,
      action: cloudAction,
      painter: cloudPainter
    })
    cloud.index = i
    cloud.count = 5 - i
    clouds.push(cloud)
    game.addInstance(cloud)
  }

  const lineInstance = new Instance({
    name: 'line',
    action: lineAction,
    painter: linePainter
  })
  game.addInstance(lineInstance)

  const hookInstance = new Instance({
    name: 'hook',
    action: hookAction,
    painter: hookPainter
  })
  game.addInstance(hookInstance)

  const tutorialInstance = new Instance({
    name: 'tutorial',
    action: tutorialAction,
    painter: tutorialPainter
  })

  const tutorialArrowInstance = new Instance({
    name: 'tutorial-arrow',
    action: tutorialAction,
    painter: tutorialPainter
  })

  const audioDropPerfect = new Audio()
  audioDropPerfect.src = pathGenerator('drop-perfect.mp3')

  const audioDrop = new Audio()
  audioDrop.src = pathGenerator('drop.mp3')

  const audioGameOver = new Audio()
  audioGameOver.src = pathGenerator('game-over.mp3')

  const audioRotate = new Audio()
  audioRotate.src = pathGenerator('rotate.mp3')

  const audioBgm = new Audio()
  audioBgm.src = pathGenerator('bgm.mp3')

  const context = new

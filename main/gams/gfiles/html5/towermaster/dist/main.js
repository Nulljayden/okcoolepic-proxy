const defineVariables = () => {
  return {
    gameStartNow: "GAME_START_NOW",
    gameUserOption: "GAME_USER_OPTION",
    hardMode: "HARD_MODE",
    successCount: "SUCCESS_COUNT",
    failedCount: "FAILED_COUNT",
    perfectCount: "PERFECT_COUNT",
    gameScore: "GAME_SCORE",
    hookDown: "HOOK_DOWN",
    hookUp: "HOOK_UP",
    hookNormal: "HOOK_NORMAL",
    bgImgOffset: "BACKGROUND_IMG_OFFSET_HEIGHT",
    lineInitialOffset: "LINE_INITIAL_OFFSET",
    bgLinearGradientOffset: "BACKGROUND_LINEAR_GRADIENT_OFFSET_HEIGHT",
    blockCount: "BLOCK_COUNT",
    blockWidth: "BLOCK_WIDTH",
    blockHeight: "BLOCK_HEIGHT",
    cloudSize: "CLOUD_SIZE",
    ropeHeight: "ROPE_HEIGHT",
    flightCount: "FLIGHT_COUNT",
    flightLayer: "FLIGHT_LAYER",
    rotateRight: "ROTATE_RIGHT",
    rotateLeft: "ROTATE_LEFT",
    swing: "SWING",
    beforeDrop: "BEFORE_DROP",
    drop: "DROP",
    land: "LAND",
    out: "OUT",
    initialAngle: "INITIAL_ANGLE",
    bgInitMovement: "BG_INIT_MOVEMENT",
    hookDownMovement: "HOOK_DOWN_MOVEMENT",
    hookUpMovement: "HOOK_UP_MOVEMENT",
    lightningMovement: "LIGHTNING_MOVEMENT",
    tutorialMovement: "TUTORIAL_MOVEMENT",
    moveDownMovement: "MOVE_DOWN_MOVEMENT",
  };
};

const drawYellowString = (ctx, { string, size, x, y, textAlign }) => {
  const c = size,
    u = 0.1 * c;
  ctx.save();
  ctx.beginPath();
  const l = ctx.createLinearGradient(0, 0, 0, y);
  l.addColorStop(0, "#FAD961");
  l.addColorStop(1, "#F76B1C");
  ctx.fillStyle = l;
  ctx.lineWidth = u;
  ctx.strokeStyle = "#FFF";
  ctx.textAlign = textAlign || "center";
  ctx.font = `${c}px wenxue`;
  ctx.strokeText(string, x, y);
  ctx.fillText(string, x, y);
  ctx.restore();
};

const addFlight = (engine, index, type) => {
  const flight = new Instance({
    name: `flight_${index}`,
    action: flightAction,
    painter: flightPainter,
  });
  flight.imgName = `f${index}`;
  flight.type = type;
  engine.addInstance(flight, flightLayer);
  engine.setVariable(flightCount, index);
};

const flightAction = (instance, time) => {
  const visible = instance.visible,
    ready = instance.ready,
    type = instance.type;
  if (visible) {
    if (!ready) {
      instance.ready = true;
      instance.width = cloudSize;
      instance.height = cloudSize;
      instance.x = engine.width / 2;
      instance.y = -1.5 * ropeHeight;
    }
    instance.x += instance.vx;
    instance.y += instance.vy;
    if (instance.y + instance.height < 0 || instance.y > engine.height) {
      instance.visible = false;
    }
  }
};

const flightPainter = (instance, ctx) => {
  const imgName = instance.imgName;
  ctx.drawImage(engine.getImg(imgName), instance.x, instance.y, instance.width, instance.height);
};

// ... rest of the code

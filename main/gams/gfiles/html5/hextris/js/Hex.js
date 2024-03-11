function Hex(sideLength) {
  // Properties
  this.playThrough = 0;
  this.fillColor = [44, 62, 80];
  this.tempColor = [44, 62, 80];
  this.angularVelocity = 0;
  this.position = 0;
  this.dy = 0;
  this.dt = 1;
  this.sides = 6;
  this.blocks = [];
  this.angle = 180 / this.sides;
  this.targetAngle = this.angle;
  this.shakes = [];
  this.sideLength = sideLength;
  this.strokeColor = 'blue';
  this.x = trueCanvas.width / 2;
  this.y = trueCanvas.height / 2;
  this.ct = 0;
  this.lastCombo = this.ct - settings.comboTime;
  this.lastColorScored = "#000";
  this.comboTime = 1;
  this.texts = [];
  this.lastRotate = Date.now();

  // Initialize blocks array
  for (var i = 0; i < this.sides; i++) {
    this.blocks.push([]);
  }

  // Shake function
  this.shake = function(obj) {
    var angle = 30 + obj.lane * 60;
    angle *= Math.PI / 180;
    var dx = Math.cos(angle) * obj.magnitude;
    var dy = Math.sin(angle) * obj.magnitude;
    var localGdx = gdx;
    var localGdy = gdy;
    localGdx -= dx;
    localGdy += dy;
    obj.magnitude /= 2 * this.dt;
    if (obj.magnitude < 1) {
      for (var i = 0; i < this.shakes.length; i++) {
        if (this.shakes[i] === obj) {
          this.shakes.splice(i, 1);
        }
      }
    }
  };

  // Add block function
  this.addBlock = function(block) {
    if (gameState !== 1 && gameState !== 0) return;
    block.settled = 1;
    block.tint = 0.6;
    var lane = this.sides - block.fallingLane - this.position;
    lane = (lane + this.sides) % this.sides;
    block.distFromHex = MainHex.sideLength / 2 * Math.sqrt(3) + block.height * this.blocks[lane].length;
    this.blocks[lane].push(block);
    block.attachedLane = lane;
    block.checked = 1;
  };

  // Check block collision function
  this.doesBlockCollide = function(block, position, tArr) {
    if (block.settled) {
      return;
    }

    if (position !== undefined) {
      var arr = tArr;
      if (position <= 0) {
        if (block.distFromHex - block.iter * this.dt * settings.scale - (this.sideLength / 2) * Math.sqrt(3) <= 0) {
          block.distFromHex = (this.sideLength / 2) * Math.sqrt(3);
          block.settled = 1;
          block.checked = 1;
        }
      } else {
        if (arr[position - 1].settled && block.distFromHex - block.iter * this.dt * settings.scale - arr[position - 1].distFromHex - arr[position - 1].height <= 0) {
          block.distFromHex = arr[position - 1].distFromHex + arr[position - 1].height;
          block.settled = 1;
          block.checked = 1;
        }
      }
    } else {
      var lane = this.sides - block.fallingLane - this.position;
      lane = (lane + this.sides) % this.sides;
      var arr = this.blocks[lane];

      if (arr.length > 0) {
        if (block.distFromHex + block.iter * this.dt * settings.scale - arr[arr.length - 1].distFromHex - arr[arr.length - 1].height <= 0) {
          block.distFromHex = arr[arr.length - 1].distFromHex + arr[arr.length - 1].height;
          this.addBlock(block);
        }
      } else {
        if (block.distFromHex + block.iter * this.dt * settings.scale - (this.sideLength / 2) * Math.sqrt(3) <= 0) {
          block.distFromHex = (this.sideLength / 2) * Math.sqrt(3);
          this.addBlock(block);
        }
      }
    }
  };

  // Rotate function
  this.rotate = function(steps) {
    if (Date.now() - this.lastRotate < 75 && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return;
    if (gameState !== 1 && gameState !== 0) return;
    this.position += steps;
    if (!history

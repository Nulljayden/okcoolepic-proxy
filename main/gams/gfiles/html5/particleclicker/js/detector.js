// Constructor function for the ParticleEvent class
function ParticleEvent(track, num, external) {
  this.track = track;
  this.num = num;
  this.alpha = 1;
  this.external = external || false;
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.direction = 0;
  this.init();
}

// Method to initialize the ParticleEvent object
ParticleEvent.prototype.init = function() {
  this.x = Math.random() * window.innerWidth;
  this.y = Math.random() * window.innerHeight;
  this.speed = 2 + Math.random() * 3;
  this.direction = Math.random() * Math.PI * 2;
};

// Method to draw the ParticleEvent object
ParticleEvent.prototype.draw = function(duration) {
  var ctx = detector.events.ctx;
  ctx.fillStyle = this.track.color;
  ctx.globalAlpha = this.alpha;
  ctx.fillRect(this.x, this.y, 10, 10);
  this.x += this.speed * Math.cos(this.direction);
  this.y += this.speed * Math.sin(this.direction);
  this.alpha -= 0.01;
  if (this.alpha <= 0) {
    this.init();
  }
};

// Detector object
var detector = {
  // Core properties
  core: {
    canvas: null,
    ctx: null
  },

  // Event properties
  events: {
    canvas: null,
    ctx: null,
    list: [],
  },

  // Visibility property
  visible: true,

  // Size properties
  width: 400,
  height: 400,
  ratio: 1,

  // Color properties
  colors: {
    siliconRing: '#FFF371',
    siliconRingLine: '#EAC918',
    ecal: '#C5FF82',
    ecalLine: '#9EFF28',
    hcal: '#E1FF79',
    hcalLine: '#C9FF2D',
    lightRing: '#A0B3FF',
    lightRingLine: '#A0B3FF',
    darkRing: '#7280B8',
    darkRingLine: '#7280B8',

    mucalLight: '#FFDFB7',
    mucalLightLine: '#FFDFB7',
    mucalDark: '#EA301F',
    mucalDarkLine: '#C5291A'
  },

  // Radius properties
  radius: {
    siliconInner: 10,
    silicon: 30,
    siliconSpace: 35,
    ecal: 50,
    hcal: 80,
    darkRing1: 83,
    darkRing1Space: 86,
    lightRing: 92,
    lightRingSpace: 94,
    darkRing2: 100,

    mucal: 107,
    mucalLight: 8,
    mucalDark: 18
  },

  // Track properties
  tracks: [
    {
      name: 'electron',
      color: '#0016EA'
    },

    {
      name: 'jet',
      color: '#0B7700'
    },

    {
      name: 'muon',
      color: '#775400'
    }
  ],

  // Last render property
  lastRender: 0,

  // Constructor function for the Detector object
  init: function(baseSize) {
    this.core.canvas = document.getElementById('detector-core');
    this.core.ctx = this.core.canvas.getContext('2d');
    this.events.canvas = document.getElementById('detector-events');
    this.events.ctx = this.events.canvas.getContext('2d');

    this.ratio = baseSize / 400;

    this.width = baseSize;
    this.height = baseSize;

    this.core.canvas.width = baseSize;
    this.core.canvas.height = baseSize;

    this.events.canvas.width = baseSize;
    this.events.canvas.height = baseSize;

    this.resize();

    this.coreDraw();
    this.animate();
  },

  // Method to draw the core of the detector
  coreDraw: function() {
    var ctx = this.core.ctx;
    var cx = this.width / 2;
    var cy = this.height / 2;

    ctx.clearRect(0, 0, this.width, this.width);

    // Draw the MUCAL
    this.drawMucal(ctx, cx, cy);

    // Draw the dark ring
    this.drawDarkRing(ctx, cx, cy);

    // Draw the light ring
    this.drawLightRing(ctx, cx, cy);

    // Draw the ECal
    this.drawECAL(ctx, cx, cy);

    // Draw the HCal
    this.drawHCAL(ctx, cx, cy);

    // Draw the silicon ring
    this.drawSiliconRing(ctx

//=============================================================================
// Breakout
//=============================================================================

type Color = {
  background: string;
  foreground: string;
  border: string;
  wall: string;
  ball: string;
  paddle: string;
  score: string;
  highscore: string;
};

type Defaults = {
  fps: number;
  stats: boolean;
  score: {
    lives: {
      initial: number;
      max: number;
    };
  };
  court: {
    xchunks: number;
    ychunks: number;
  };
  ball: {
    radius: number;
    speed: number;
    labels: {
      [index: number]: {
        text: string;
        fill: string;
        stroke: string;
        font: string;
      };
    };
  };
  paddle: {
    width: number;
    height: number;
    speed: number;
  };
  color: Color;
  state: {
    initial: string;
    events: {
      name: string;
      from: string;
      to: string;
    }[];
  };
  keys: {
    keys: (Game.KEY | string)[];
    mode: string;
    action: () => void;
    state?: string;
  }[];
  sounds: {
    brick: string;
    paddle: string;
    go: string;
    levelup: string;
    loselife: string;
    gameover: string;
  };
};

type Game = {
  KEY: {
    LEFT: string;
    UP: string;
    RIGHT: string;
    DOWN: string;
    SPACE: string;
    RETURN: string;
    ESC: string;
  };
  addEvent: (
    element: EventTarget,
    eventName: string,
    eventHandler: EventListenerOrEventListenerObject,
    useCapture?: boolean
  ) => void;
  loadSounds: (options: { sounds: { [index: string]: string } }) => void;
  ua: {
    hasTouch: boolean;
  };
  confirm: (message: string) => boolean;
  renderToCanvas: (
    width: number,
    height: number,
    renderFunction: (ctx: CanvasRenderingContext2D) => void,
    canvas?: HTMLCanvasElement
  ) => HTMLCanvasElement;
};

type Breakout = {
  Defaults: Defaults;
  initialize: (runner: Game, cfg: Defaults) => void;
  onstartup: () => void;
  addEvents: () => void;
  toggleSound: () => void;
  update: (dt: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  onresize: (width: number, height: number) => void;
  onmenu: () => void;
  ongame: () => void;
  onlose: () => void;
  onleavegame: () => void;
  loseBall: () => void;
  winLevel: () => void;
  hitBrick: (brick: { isbrick: boolean; hit: boolean; x: number; y: number; w: number; h: number; score: number; color: string }) => void;
  resetLevel: () => void;
  setLevel: (level?: number) => void;
  canPrevLevel: () => boolean;
  canNextLevel: () => boolean;
  prevLevel: (force?: boolean) => void;
  nextLevel: (force?: boolean) => void;
  initCanvas: (ctx: CanvasRenderingContext2D) => void;
  refreshDOM: () => void;
  playSound: (id: string) => void;
  ontouchmove: (ev: TouchEvent) => void;
  //... other methods and properties
};

//... other classes and functions

const Breakout: Breakout = {
  Defaults: {
    //...
  },

  initialize(runner, cfg) {
    //...
  },

  onstartup() {
    //...
  },

  addEvents() {
    //...
  },

  toggleSound() {
    //...
  },

  update(dt) {
    //...
  },

  draw(ctx) {
    //...
  },

  onresize(width, height) {
    //...
  },

  onmenu() {
    //...
  },

  ongame() {
    //...
  },

  onlose() {
    //...
  },

  onleavegame() {
    //...
  },

  loseBall() {
    //...
  },



import Entity, { BLOCKS_NONE, BLOCKS_MOVEMENT, BLOCKS_LIGHT } from "entity.js";
import * as log from "ui/log.js";
import * as pubsub from "util/pubsub.js";

export class Brambles extends Entity {
  constructor({ ch = "%", fg = "#483", name = "dense brambles" }: {
    ch?: string;
    fg?: string;
    name?: string;
  }) {
    super({ ch, fg, name });
  }

  describeA() { return this.toString(); }
}

export class Princess extends Entity {
  constructor({ ch = "P", fg = "#ff0", name = "princess" }: {
    ch?: string;
    fg?: string;
    name?: string;
  }) {
    super({ ch, fg, name });
    this.blocks = BLOCKS_MOVEMENT;
  }
}

export class Pillar extends Entity {
  constructor({ ch = "T", fg = "#fff", name = "pillar" }: {
    ch?: string;
    fg?: string;
    name?: string;
  }) {
    super({ ch, fg, name });
    this.blocks = BLOCKS_MOVEMENT;
  }
}

export class Floor extends Entity {
  constructor({ ch = ".", fg = "#aaa", name = "stone floor" }: {
    ch?: string;
    fg?: string;
    name?: string;
  }) {
    super({ ch, fg, name });
  }
}

export class Wall extends Entity {
  constructor({ ch = "#", fg = "#666", name = "solid wall" }: {
    ch?: string;
    fg?: string;
    name?: string;
  }) {
    super({ ch, fg, name });
    this.blocks = BLOCKS_LIGHT;
  }
}

export class Grass extends Entity {
  constructor(ch: string) {
    super({ ch, fg: "#693" });
  }
}

export class Tree extends Entity {
  constructor() {
    super({ ch: "T", fg: "green" });
  }
}

export class Door extends Entity {
  private _isOpen = false;

  constructor(closed: boolean = true) {
    super({ ch: "/", fg: "#9

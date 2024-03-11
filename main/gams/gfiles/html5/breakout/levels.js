type Color = {
  w: string; // white
  o: string; // orange
  l: string; // light blue
  g: string; // green
  r: string; // red
  b: string; // blue
  p: string; // pink
  y: string; // yellow
  s: string; // silver
  d: string; // gold
};

type Level = {
  colors: Color | { [key: string]: string };
  bricks: string[];
};

const Breakout = {
  Colors: {
    arkanoid: {
      w: "#FCFCFC", // white
      o: "#FC7460", // orange
      l: "#3CBCFC", // light blue
      g: "#80D010", // green
      r: "#D82800", // red
      b: "#0070EC", // blue
      p: "#FC74B4", // pink
      y: "#FC9838", // yellow
      s: "#BCBCBC", // silver
      d: "#F0BC3C" // gold
    },

    pastel: {
      y: "#FFF7A5", // yellow
      p: "#FFA5E0", // pink
      b: "#A5B3FF", // blue
      g: "#BFFFA5", // green
      o: "#FFCBA5" // orange
    },

    vintage: {
      a: "#EFD279", // yellow
      b: "#95CBE9", // light blue
      c: "#024769", // dark blue
      d: "#AFD775", // light green
      e: "#2C5700", // dark green
      f: "#DE9D7F", // red
      g: "#7F9DDE", // purple
      h: "#00572C", // dark green
      i: "#75D7AF", // mint
      j: "#694702", // brown
      k: "#E9CB95", // peach
      l: "#79D2EF" // blue
    },

    liquidplanner: {
      a: '#62C4E7', // light blue
      b: '#00A5DE', // dark blue
      x: '#969699', // light gray
      y: '#7B797E' // dark gray
    },
  },

  Levels: [
    {
      colors: Breakout.Colors.pastel,
      bricks: [
        "",
        `${'y'.repeat(15)}YY${'y'.repeat(15)}YY${'y'.repeat(15)}YY`,
        `${'p'.repeat(15)}PP${'p'.repeat(15)}PP${'p'.repeat(15)}PP`,
        `${'b'.repeat(15)}BB${'b'.repeat(15)}BB${'b'.repeat(15)}BB`,
        `${'g'.repeat(15)}GG${'g'.repeat(15)}GG${'g'.repeat(15)}GG`,
        `${'o'.repeat(15)}OO${'o'.repeat(15)}OO${'o'.repeat(15)}OO`,
      ],
    },
    // ... other level definitions ...
  ],

  getBricks(level: Level): { color: string, value: string }[] {
    return level.bricks.map(brick => ({
      color: level.colors === Breakout.Colors.liquidplanner
        ? (brick === 'a' ? Breakout.Colors.liquidplanner.a : Breakout.Colors.liquidplanner.b)
        : level.colors[brick.toUpperCase()] || level.colors[brick],
      value: brick,
    }));
  },
};


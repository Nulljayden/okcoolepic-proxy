$.audio = {
  sounds: {},
  references: [],
  play: function(sound) {
    if (!$.mute) {
      const audio = $.audio.sounds[sound];
      const pool = audio.pool;
      const tick = audio.tick;

      if (pool[tick]) {
        pool[tick].play();
      } else {
        console.error(`No sound found for tick ${tick} in sound ${sound}`);
      }

      audio.tick = (tick + 1) % audio.count;
    }
  }
};

if ($.definitions && $.definitions.audio) {
  for (const [k, v] of Object.entries($.definitions.audio)) {
    if (v.params && Array.isArray(v.params)) {
      $.audio.sounds[k] = {
        tick: 0,
        count: v.count,
        pool: []
      };

      $.audio.sounds[k].pool = v.params.map((param, index) => {
        const audio = new Audio();

        try {
          audio.src = jsfxr(param);
          $.audio.references.push(audio);
        } catch (e) {
          console.error(`Error creating sound for param ${param}: ${e.message}`);
        }

        return audio;
      });
    } else {
      console.error(`Invalid audio definition for key ${k}`);
    }
  }
} else {
  console.error("Missing or invalid audio definitions");
}

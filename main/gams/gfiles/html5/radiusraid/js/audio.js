// The audio object is used to manage sounds in the application
$.audio = {
  // An object to store all the sounds, keyed by their names
  sounds: {},
  // An array to store all the audio element references
  references: [],
  // The play function plays a sound if the application is not muted
  play: function(sound) {
    if (!$.mute) {
      const audio = $.audio.sounds[sound];
      const pool = audio.pool;
      const tick = audio.tick;

      // Play the sound from the pool corresponding to the current tick
      if (pool[tick]) {
        pool[tick].play();
      } else {
        console.error(`No sound found for tick ${tick} in sound ${sound}`);
      }

      // Increment the tick and wrap it around the count
      audio.tick = (tick + 1) % audio.count;
    }
  }
};

// If audio definitions are provided, load the sounds
if ($.definitions && $.definitions.audio) {
  for (const [k, v] of Object.entries($.definitions.audio)) {
    if (v.params && Array.isArray(v.params)) {
      // Create a new sound object and store it in the sounds object
      $.audio.sounds[k] = {
        tick: 0,
        count: v.count,
        pool: []
      };

      // Initialize the pool array with audio elements created from the parameters
      $.audio.sounds[k].pool = v.params.map((param, index) => {
        const audio = new Audio();

        try {
          // Generate the sound using jsfxr and set it as the audio source
          audio.src = jsfxr(param);
          // Store the audio reference for future cleanup
          $.audio.references.push(audio);
        } catch (e) {
          console.error(`Error creating sound for param ${param}: ${e.message}`);
        }

        return audio;
      });
    } else {
      console.error(`Invalid audio definition for key ${

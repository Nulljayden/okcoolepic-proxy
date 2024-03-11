/**
 * Events that can occur when the Room module is active
 **/

const createScene = (title, text, notification, blink, buttons) => ({
  title,
  text,
  notification,
  blink,
  buttons,
});

const createButton = (text, nextScene, cost, available, reward, notification) => ({
  text,
  nextScene,
  cost,
  available,
  reward,
  notification,
});

const playAudio = (audio) => {
  // code to play audio
};

const getRandomInt = (max) => Math.floor(Math.random() * max);

const addReward = (store, reward) => {
  for (const [key, value] of Object.entries(reward)) {
    store[key] = (store[key] || 0) + value;
  }
};

const removeResource = (store, resource, quantity) => {
  if (store[resource] >= quantity) {
    store[resource] -= quantity;
    return true;
  }
  return false;
};

const notify = (text) => {
  // code to display notification
};

const EventsRoom = [
  {
    title: _('The Nomad'),
    isAvailable: function () {
      return Engine.activeModule === Room && $SM.get('stores.fur', true) > 0;
    },
    scenes: {
      start: createScene(
        null,
        [_('a nomad shuffles into view, laden with makeshift bags bound with rough twine.')],
        _('a nomad arrives, looking to trade'),
        true,
        null
      ),
    },
    audio: AudioLibrary.EVENT_NOMAD,
    onLoad: function () {
      playAudio(this.audio);
    },
  },
  // other events follow the same structure as the first event
];


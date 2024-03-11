/**
 * Events that can occur when the Outside module is active
 **/

// Function to generate random integer values
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to display notifications
function displayNotification(notification) {
  console.log(notification);
}

// Function to display buttons
function displayButtons(buttons) {
  for (const button in buttons) {
    console.log(`${buttons[button].text} (${button})`);
  }
}

// Function to handle button clicks
function handleButtonClick(button, nextScene) {
  console.log(`Button "${button}" clicked. Navigating to scene "${nextScene}".`);
}

// Function to get the cost of a scene
function getCost(cost) {
  let result = '';
  for (const resource in cost) {
    result += `${resource}: ${cost[resource]}, `;
  }
  return result.slice(0, -2);
}

// Function to get the reward of a scene
function getReward(reward) {
  let result = '';
  for (const resource in reward) {
    result += `${resource}: ${reward[resource]}, `;
  }
  return result.slice(0, -2);
}

// Function to update the village
function updateVillage() {
  console.log('Updating village...');
}

// Function to kill villagers
function killVillagers(numKilled) {
  console.log(`${numKilled} villagers killed.`);
}

// Function to destroy huts
function destroyHuts(numHuts) {
  console.log(`${numHuts} huts destroyed.`);
}

// Function to play audio
function playAudio(audio) {
  console.log(`Playing audio "${audio}"...`);
}

const Events = {
  Outside: [
    {
      title: _('A Ruined Trap'),
      isAvailable: function() {
        return Engine.activeModule == Outside && $SM.get('game.buildings["trap"]', true) > 0;
      },
      scenes: {
        start: {
          text: [
            _('some of the traps have been torn apart.'),
            _('large prints lead away, into the forest.')
          ],
          onLoad: function() {
            const numWrecked = getRandomInt(1, $SM.get('game.buildings["trap"]', true));
            $SM.add('game.buildings["trap"]', -numWrecked);
            updateVillage();
            updateTrapButton();
          },
          notification: _('some traps have been destroyed'),
          blink: true,
          buttons: {
            track: {
              text: _('track them'),
              nextScene: { 0.5: 'nothing', 1: 'catch' }
            },
            ignore: {
              text: _('ignore them'),
              nextScene: 'end'
            }
          }
        },
        nothing: {
          text: [
            _('the tracks disappear after just a few minutes.'),
            _('the forest is silent.')
          ],
          notification: _('nothing was found'),
          buttons: {
            end: {
              text: _('go home'),
              nextScene: 'end'
            }
          }
        },
        catch: {
          text: [
            _('not far from the village lies a large beast, its fur matted with blood.'),
            _('it puts up little resistance before the knife.')
          ],
          notification: _('there was a beast. it\'s dead now'),
          reward: {
            fur: 100,
            meat: 100,
            teeth: 10
          },
          buttons: {
            end: {
              text: _('go home'),
              nextScene: 'end'
            }
          }
        }
      },
      audio: AudioLibrary.EVENT_RUINED_TRAP
    },
    {
      title: _('Fire'),
      isAvailable: function() {
        return Engine.activeModule == Outside && $SM.get('game.buildings["hut"]', true) > 0 && $SM.get('game.population', true) > 50;
      },
      scenes: {
        start: {
          text: [
            _('a fire rampages through one of the huts, destroying it.'),
            _('all residents in the hut perished in the fire.')
          ],
          notification: _('a fire has started'),
          blink: true,
          onLoad: function() {
            destroyHuts(1);
          },
          buttons: {
            mourn: {
              text: _('mourn'),
              notification: _('some villagers have died'),
              nextScene: 'end'
            }
          }
        }
      },
      audio: AudioLibrary.EVENT_HUT_FIRE
    },
    {
      title: _('Sickness'),
      isAvailable: function() {
        return Engine

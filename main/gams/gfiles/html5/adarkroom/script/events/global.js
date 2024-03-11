/**
 * Events that can occur when any module is active (except World).
 */

// Check if the active module is not World
function isNotWorld(module) {
  /**
   * Returns true if the active module is not 'World', false otherwise.
   * This function is used to filter out events that should not occur when
   * the active module is 'World'.
   */
  return module !== 'World';
}

const Events = {
  Global: [
    {
      /* The Thief */
      title: _('The Thief'),
      /**
       * Checks if the thief event is available based on the active module
       * and the number of thieves. Returns true if the active module is
       * not 'World' and there is exactly one thief, false otherwise.
       */
      isAvailable: function () {
        const activeModule = Engine.activeModule;
        return isNotWorld(activeModule) && $SM.get('game.thieves') === 1;
      },
      scenes: {
        start: {
          text: [
            _('the villagers haul a filthy man out of the store room.'),
            _("say his folk have been skimming the supplies."),
            _('say he should be strung up as an example.')
          ],
          /**
           * Notification to display when the thief event is triggered.
           */
          notification: _('a thief is caught'),
          blink: true,
          buttons: {
            kill: {
              text: _('hang him'),
              /**
               * Plays the 'hang' scene when the 'kill' button is clicked.
               */
              nextScene: (scene) => playScene(scene, 'hang')
            },
            spare: {
              text: _('spare him'),
              /**
               * Plays the 'spare' scene when the 'spare' button is clicked.
               */
              nextScene: (scene) => playScene(scene, 'spare')
            },
            default: {
              text: _('leave'),
              /**
               * Plays the 'end' scene when the 'default' button is clicked.
               */
              nextScene: (scene) => playScene(scene, 'end')
            }
          }
        },
        hang: {
          text: [
            _('the villagers hang the thief high in front of the store room.'),
            _('the point is made. in the next few days, the missing supplies are returned.')
          ],
          /**
           * Callback function to execute when the 'hang' scene is loaded.
           * Increases the number of thieves, removes the 'income.thieves' variable,
           * and adds the stolen supplies back to the 'stores' variable.
           */
          onLoad: function () {
            $SM.set('game.thieves', 2);
            $SM.remove('income.thieves');
            $SM.addM('stores', $SM.get('game.stolen'));
          },
          buttons: {
            leave: {
              text: _('leave'),
              /**
               * Plays the 'end' scene when the 'leave' button is clicked.
               */
              nextScene: 'end'
            }
          }
        },

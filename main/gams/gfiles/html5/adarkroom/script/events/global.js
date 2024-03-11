/**
 * Events that can occur when any module is active (except World).
 */

// Check if the active module is not World
function isNotWorld(module) {
  return module !== 'World';
}

const Events = {
  Global: [
    {
      /* The Thief */
      title: _('The Thief'),
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
          notification: _('a thief is caught'),
          blink: true,
          buttons: {
            kill: {
              text: _('hang him'),
              nextScene: (scene) => playScene(scene, 'hang')
            },
            spare: {
              text: _('spare him'),
              nextScene: (scene) => playScene(scene, 'spare')
            },
            default: {
              text: _('leave'),
              nextScene: (scene) => playScene(scene, 'end')
            }
          }
        },
        hang: {
          text: [
            _('the villagers hang the thief high in front of the store room.'),
            _('the point is made. in the next few days, the missing supplies are returned.')
          ],
          onLoad: function () {
            $SM.set('game.thieves', 2);
            $SM.remove('income.thieves');
            $SM.addM('stores', $SM.get('game.stolen'));
          },
          buttons: {
            leave: {
              text: _('leave'),
              nextScene: 'end'
            }
          }
        },
        spare: {
          text: [
            _("the man says he's grateful. says he won't come around any more."),
            _("shares what he knows about sneaking before he goes.")
          ],
          onLoad: function

/**
 * Module for triggering marketing messages
 * @author mtownsend
 * @since Jan 2021
 */

// Check if the Events object exists
if (typeof Events !== 'undefined') {
  // Add the marketing module to the Events object
  Events.Marketing = Events.Marketing || [];

  // Define the marketing module
  const marketingModule = {
    /* Play Penrose! */
    title: _('Penrose'),
    weight: 1,
    isAvailable: () => !$SM.get('marketing.penrose'),
    scenes: {
      'start': {
        text: [
          _('a strange thrumming, pounding and crashing. visions of people and places, of a huge machine and twisting curves.'),
          _('inviting. it would be so easy to give in, completely.')
        ],
        notification: {
          text: _('a strange thrumming, pounding and crashing. and then gone.'),
          duration: 3000
        },
        blink: true,
        buttons: {
          'give in': {
            text: _('give in'),
            onClick: () => {
              triggerMarketingMessage('penrose');
            },
            link: 'https://penrose.doublespeakgames.com/?utm_source=adarkroom&utm_medium=crosspromote&utm_campaign=event'
          },
          'ignore': {
            text: _('ignore it'),


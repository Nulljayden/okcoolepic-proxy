(function (Engine, Events, Dropbox, $) {

  /**
   * Module that enables saving the game state to Dropbox Datastore
   * @see https://www.dropbox.com/developers/datastore
   *
   * The Dropbox Datastore connector lets you save your data to your own Dropbox Datastore
   * without cluttering your files.
   *
   * This connector uses the game engine's own base64 encoder.
   */

  'use strict';

  if (!Engine) {
    return false;
  } // Game Engine not available
  if (!Dropbox) {
    return false;
  } // Dropbox Connector not available

  const DropboxConnector = {

    options: {
      log: false,
      key: 'q7vyvfsakyfmp3o',
      table: 'adarkroom'
    },

    client: false,
    table: false,
    dropboxAccount: false,
    savegameKey: false,
    savegames: {0: null, 1: null, 2: null, 3: null, 4: null},

    init(options) {
      this.options = $.extend(this.options, options);

      this._log = this.options.log;

      this.client = new Dropbox.Client({key: DropboxConnector.options.key});
      this.connectToDropbox(false);

      return this;
    },

    startDropbox() {
      if (!DropboxConnector.client || !DropboxConnector.table) {
        DropboxConnector.startDropboxConnectEvent();
      } else {
        DropboxConnector.startDropboxImportEvent();
      }
    },

    /**
     * ******
     * Events
     * ******
     */

    startDropboxConnectEvent() {
      Events.startEvent({
        title: _('Dropbox connection'),
        scenes: {
          start: {
            text: [_('connect game to Dropbox local storage')],
            buttons: {
              'connect': {
                text: _('connect'),
                nextScene: 'end',
                onChoose: () => {
                  DropboxConnector.connectToDropbox(DropboxConnector.startDropboxImportEvent);
                }
              },
              'cancel': {
                text: _('cancel'),
                nextScene: 'end'
              }
            }
          }
        }
      });
    },

    startDropboxImportEvent() {
      Events.startEvent({
        title: _('Dropbox Export / Import'),
        scenes: {
          start: {
            text: [
              _('export or import save data to Dropbox Datastorage'),
              _('you are connected to Dropbox with account / email ') + DropboxConnector.dropboxAccount
            ],
            buttons: {
              'save': {
                text: _('save'),
                nextScene: {1: 'saveToSlot'}
              },
              'load': {
                text: _('load'),
                nextScene: {1: 'loadFromSlot'},
                onChoose: DropboxConnector.loadGamesFromDropbox
              },
              'signout': {
                text: _('signout'),
                nextScene: 'end',
                onChoose: DropboxConnector.signout
              },
              'cancel': {
                text: _('cancel'),
                nextScene: 'end'
              }
            }
          },
          saveToSlot: {
            text: [_('choose one slot to save to')],
            buttons: (function () {
              const buttons = {};

              $.each(DropboxConnector.savegames, (n, savegame) => {
                buttons[`savegame${n}`] = {
                  text: _('save to slot') + n + ' ' + (savegame ? DropboxConnector.prepareSaveDate(savegame.get('timestamp')) : 'empty'),
                  nextScene: 'end',
                  onChoose: () => {
                    DropboxConnector.log('Save to slot ' + n + ' initiated');
                    // timeout prevents error due to fade out animation of the previous event
                    Engine.setTimeout(() => {
                      DropboxConnector.log('Save to slot ' + n);
                      DropboxConnector.saveGameToDropbox(n, DropboxConnector.savedtoDropboxEvent);
                    }, 1000);
                  }
                };
              });

              buttons.cancel = {
                text: _('cancel'),
                nextScene: 'end'
              };

              return buttons;
            }())
          },
          loadFromSlot: {
            text: [_('choose one slot to load from')],
            buttons: (function () {
              const buttons = {};

              $.each(DropboxConnector.savegames, (n, savegame) => {
                if (savegame) {
                  buttons[`savegame${n}`] = {
                    text: _('load from slot') + n + ' ' + DropboxConnector.prepareSaveDate(savegame.get('timestamp')),
                    nextScene: 'end',
                    onChoose: () => {
                      DropboxConnector.log('Load from slot ' + n + ' initiated');
                      // timeout prevents error due to fade out animation of the previous event
                      Engine.setTimeout(() => {
                        DropboxConnector.log('Load from slot ' + n);
                        DropboxConnector.loadGameFromDropbox(n);
                      }, 1000);
                    }
                  };
                }
              });

              buttons.cancel = {
                text: _('cancel'),
                nextScene: 'end'
              };

              return buttons

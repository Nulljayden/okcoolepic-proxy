/**
 * Module that handles the random event system
 */
const Events = {
  _EVENT_TIME_RANGE: [3, 6], // range, in minutes
  _PANEL_FADE: 200,
  _FIGHT_SPEED: 100,
  _EAT_COOLDOWN: 5,
  _MEDS_COOLDOWN: 7,
  _LEAVE_COOLDOWN: 1,
  STUN_DURATION: 4000,
  BLINK_INTERVAL: false,
  init() {
    // Build the Event Pool
    const EventPool = [].concat(Events.Global, Events.Room, Events.Outside, Events.Marketing);
    Events.eventStack = [];
    Events.scheduleNextEvent();

    // subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Events.handleStateUpdates);

    // check for stored delayed events
    Events.initDelay();
  },

  delayState: 'wait',
  activeScene: null,

  loadScene(name) {
    Engine.log(`loading scene: ${name}`);
    Events.activeScene = name;
    const scene = Events.activeEvent().scenes[name];

    // onLoad
    if (scene.onLoad) {
      scene.onLoad();
    }

    // Notify the scene change
    if (scene.notification) {
      Notifications.notify(null, scene.notification);
    }

    // Scene reward
    if (scene.reward) {
      $SM.addM('stores', scene.reward);
    }

    $('#description', Events.eventPanel()).empty();
    $('#buttons', Events.eventPanel()).empty();
    if (scene.combat) {
      Events.startCombat(scene);
    } else {
      Events.startStory(scene);
    }
  },

  startCombat(scene) {
    Engine.event('game event', 'combat');
    Events.fought = false;
    const desc = $('#description', Events.eventPanel());

    createDivWithText('', scene.notification).appendTo(desc);

    // Draw pause button
    // Disable for now, because it doesn't work and looks weird
    // ...

    const fightBox = createDivWithClass('fight');
    // Draw the wanderer
    const wanderer = Events.createFighterDiv('@', World.health, World.getMaxHealth()).appendTo(fightBox);
    // Draw the enemy
    Events.createFighterDiv(scene.chara, scene.health, scene.health).appendTo(fightBox);

    // Draw the action buttons
    const btns = $('#buttons', Events.eventPanel());

    const attackBtns = createDivWithClass('attackButtons').appendTo(btns);
    let numWeapons = 0;
    for (const k in World.Weapons) {
      const weapon = World.Weapons[k];
      if (typeof Path.outfit[k] === 'number' && Path.outfit[k] > 0) {
        if (typeof weapon.damage !== 'number' || weapon.damage === 0) {
          // Weapons that deal no damage don't count
          numWeapons--;
        } else if (weapon.cost) {
          let num = 0;
          for (const c in weapon.cost) {
            num = weapon.cost[c];
            if (typeof Path.outfit[c] !== 'number' || Path.outfit[c] < num) {
              // Can't use this weapon, so don't count it
              numWeapons--;
              break;
            }
          }
        }
        numWeapons++;
        Events.createAttackButton(k).appendTo(attackBtns);
      }
    }
    if (numWeapons === 0) {
      // No weapons? You can punch stuff!
      Events.createAttackButton('fists').prependTo(attackBtns);
    }
    createDivWithClass('clear').appendTo(attackBtns);

    const healBtns = createDivWithClass('healButtons').appendTo(btns);
    Events.createEatMeatButton().appendTo(healBtns);
    if ((Path.outfit['medicine'] || 0) !== 0) {
      Events.createUseMedsButton().appendTo(healBtns);
    }
    createDivWithClass('clear').appendTo(healBtns);
    Events.setHeal(healBtns);

    // Set up the enemy attack timer
    Events._enemyAttackTimer = Engine.setInterval(Events.enemyAttack, scene.attackDelay * 1000);
  },

  // ... (rest of the code)

  createDivWithClass(className) {
    return $('<div>').attr('class', className);
  },

  createDivWithText(text, className) {
    return $('<div>').text(text).addClass(className);
  },

  createFighterDiv(chara, hp, maxhp) {
    const fighter = $('<div>').addClass('fighter').text(_(chara)).data('hp', hp).data('maxHp', maxhp).data('refname', chara);
    $('<div>').addClass('hp

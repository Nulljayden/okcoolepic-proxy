var Helpers = require('./helpers');
var UI = require('./ui');

var GameObjects = (function() {
  'use strict';

  /** @class GameObject
   * Base class for all objects in the game. This works together with the
   * saving mechanism.
   */
  var GameObject = function(obj) {
    this.state = {};
    this.name = obj.name;
    $.extend(this, obj);
    if (!this.key) {
      throw 'Error: GameObject has to have a key!';
    }
  };
  GameObject.prototype.loadState =
      function(state) { $.extend(this.state, state); };

  GameObject.prototype.saveState =
      function() { return this.state; };

  GameObject.prototype.toString = function() {
    return JSON.stringify(this.state);
  };

  /** @class Lab
   */
  var Lab = function() {
    GameObject.apply(this, [{
                             name: 'Lab',
                             key : 'lab',
                             state : {
                               name : 'Give your lab an awesome name!',
                               detector : 1,
                               factor : 5,
                               data : 0,
                               money : 0,
                               reputation : 0,
                               clicks : 0,
                               moneyCollected : 0,
                               moneySpent : 0,
                               dataCollected : 0,
                               dataSpent : 0,
                               time: 0
                             }
                           }]);
    this.initialize();
  };

  Lab.prototype = Object.create(GameObject.prototype);

  Lab.prototype.constructor = Lab;

  Lab.prototype.initialize = function() {
    this.getGrant = this.getGrant.bind(this);
    this.acquireData = this.acquireData.bind(this);
    this.clickDetector = this.clickDetector.bind(this);
    this.research = this.research.bind(this);
    this.buy = this.buy.bind(this);
  };

  Lab.prototype.getGrant = function() {
    var addition = this.state.reputation * this.state.factor;
    this.state.money += addition;
    this.state.moneyCollected += addition;
    return addition;
  };

  Lab.prototype.acquireData = function(amount) {
    this.state.data += amount;
    this.state.dataCollected += amount;
  };

  Lab.prototype.clickDetector = function() {
    this.state.clicks += 1;
    this.acquireData(this.state.detector);
  };

  Lab.prototype.research = function(cost, reputation) {
    if (this.state.data >= cost) {
      this.state.data -= cost;
      this.state.dataSpent += cost;
      this.state.reputation += reputation;
      return true;
    }
    return false;
  };

  Lab.prototype.buy = function(cost) {
    if (this.state.money >= cost) {
      this.state.money -= cost;
      this.state.moneySpent += cost;
      return true;
    }
    return false;
  };

  Lab.prototype.getCostFormatted = function() {
    return this.state.cost.toFixed(2);
  };

  /** @class Research
   */
  var Research = function() {
    GameObject.apply(this, [{
                             name: 'Research',
                             key : 'research',
                             state : {
                               level : 0,
                               interesting : false,
                               cost : 10,
                               cost_increase : 1.2,
                               reputation : 10,
                               info_levels : [1, 5, 10],
                               info : 'research_info.html'
                             }
                           }]);
    this.initialize();
  };

  Research.prototype = Object.create(GameObject.prototype);

  Research.prototype.constructor = Research;

  Research.prototype.initialize = function() {
    this.isVisible = this.isVisible.bind(this);
    this.isAvailable = this.isAvailable.bind(this);
    this.research = this.research.bind(this);
    this.getInfo = this.getInfo.bind(this);
  };

  Research.prototype.isVisible = function(lab) {
    if (!lab) {
      return false;
    }
    return this.state.level > 0 ||
           lab.state.data >= this.state.cost * 0.5;
  };

  Research.prototype.isAvailable = function(lab) {
    if (!lab) {
      return false;
    }
    return lab.state.data >= this.state.cost;
  };

  Research.prototype.research = function(lab) {
    if (lab && lab.research(this.state.cost, this.state.reputation)) {
      this.state.level++;
      if (this.state.info_levels.length

/** @module Helpers
 * Define some useful helpers that are used throughout the game.
 */

// Add jQuery as a dependency
const $ = require('jquery');

var Helpers = (function () {
  'use strict';

  /** Load a file (usually JSON).
   */
  var loadFile = function (filename) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: filename,
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, status, error) {
          reject(error);
        }
      });
    });
  };

  /** Format a number with proper postfix.
   */
  var formatNumberPostfix = function (number) {
    if (typeof number !== 'number') {
      return 0;
    }

    const prefixes = [
      { magnitude: 1e24, label: 'Y' },
      { magnitude: 1e21, label: 'Z' },
      { magnitude: 1e18, label: 'E' },
      { magnitude: 1e15, label: 'P' },
      { magnitude: 1e12, label: 'T' },
      { magnitude: 1e9, label: 'B' },
      { magnitude: 1e6, label: 'M' },
      { magnitude: 1e3, label: 'k' }
    ];

    const abs = Math.abs(number);
    for (let i = 0; i < prefixes.length; i++) {
      if (abs >= prefixes[i].magnitude) {
        return (number / prefixes[i].magnitude).toFixed(1) + prefixes[i].label;
      }
    }
    return number;
  };

  var formatTime = function (msec) {
    const totals = Math.ceil(msec / 1000);
    let days = Math.floor(totals / (24 * 60 * 60));
    let hours = Math.floor((totals % (24 * 60 * 60)) / (60 * 60));
    let totalmin = (totals % (24 * 60 * 60)) % (60 * 60);
    let mins = Math.floor(totalmin / 60);
    let secs = totalmin % 60;

    const str = [];
    if (days > 0) {
      str.push(days + ' day' + (days % 100 == 1 ? '' : 's'));
    }
    if (hours > 0) {
      str.push(hours + ' h');
    }
    if (mins > 0) {
      str.push(mins + ' min');
    }
    if (secs > 0) {
      str.push(secs + ' s');
    }

    return str.join(', ');
  };

  let saveVersion = '1.0';

  var validateSaveVersion = function () {
    if (typeof localStorage !==

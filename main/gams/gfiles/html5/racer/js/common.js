//=========================================================================
// minimalist DOM helpers
//=========================================================================

var Dom = {

  // Gets an element by its ID, either directly or by calling document.getElementById
  get:  function(id)                     { return ((id instanceof HTMLElement) || (id === document)) ? id : document.getElementById(id); },

  // Sets the innerHTML property of an element
  set:  function(id, html)               { Dom.get(id).innerHTML = html;                        },

  // Adds an event listener to an element
  on:   function(ele, type, fn, capture) { Dom.get(ele).addEventListener(type, fn, capture);    },

  // Removes an event listener from an element
  un:   function(ele, type, fn, capture) { Dom.get(ele).removeEventListener(type, fn, capture); },

  // Sets the display style of an element
  show: function(ele, type)              { Dom.get(ele).style.display = (type || 'block');      },

  // Blurs the focus of an event
  blur: function(ev)                     { ev.target.blur();                                    },

  // Adds or removes a class from an element
  addClassName:    function(ele, name)     { Dom.toggleClassName(ele, name, true);  },
  removeClassName: function(ele, name)     { Dom.toggleClassName(ele, name, false); },
  toggleClassName: function(ele, name, on) {
    ele = Dom.get(ele);
    var classes = ele.className.split(' ');
    var n = classes.indexOf(name);
    on = (typeof on == 'undefined') ? (n < 0) : on;
    if (on && (n < 0))
      classes.push(name);
    else if (!on && (n >= 0))
      classes.splice(n, 1);
    ele.className = classes.join(' ');
  },

  // A simple storage object that uses window.localStorage if it is available, or an empty object otherwise
  storage: window.localStorage || {}

}

//=========================================================================
// general purpose helpers (mostly math)
//=========================================================================

var Util = {

  // Returns the current timestamp in milliseconds
  timestamp:        function()                  { return new Date().getTime();                                    },

  // Converts a value to an integer, or returns a default value if the conversion is not possible
  toInt:            function(obj, def)          { if (obj !== null) { var x = parseInt(obj, 10); if (!isNaN(x)) return x; } return Util.toInt(def, 0); },

  // Converts a value to a float, or returns a default value if the conversion is not possible
  toFloat:          function(obj, def)          { if (obj !== null) { var x = parseFloat(obj);   if (!isNaN(x)) return x; } return Util.toFloat(def, 0.0); },

  // Returns the limit of a value between a minimum and maximum
  limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));                     },

  // Returns a random integer between a minimum and maximum
  randomInt:        function(min, max)          { return Math.round(Util.interpolate(min, max, Math.random()));   },

  // Returns a random element from an array
  randomChoice:     function(options)           { return options[Util.randomInt(0, options.length-1)];            },

  // Returns the percentage of an integer value remaining in a total
  percentRemaining: function(n, total)          { return (n%total)/total;                                         },

  // Accelerates a value by a given acceleration over a given time
  accelerate:       function(v, accel, dt)      { return v + (accel * dt);                                        },

  // Interpolates between two values based on a percentage
  interpolate:      function(a,b,percent)       { return a + (b-a)*percent                                        },

  // Eases in to a value based on a percentage
  easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },

  // Eases out to a value based on a percentage
  easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },

  // Eases in and out to a value based on a percentage
  easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },

  // Calculates the exponential fog density based on a distance
  exponentialFog:   function(distance, density) { return 1 / (Math.pow(Math.E, (distance * distance * density))); },

  // Increases a value by a given increment, wrapping around the maximum if necessary
  increase:  function(start, increment, max) { // with looping
    var result = start + increment;
    while (result >= max)
      result -= max;
    while (result < 0)
      result += max;
    return result;
  },

  // Projects a point onto a canvas, taking into account the camera position and depth
  project: function(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
    p.camera.x     = (p.world.x || 0) - cameraX;
    p.camera.y     = (p.world.y || 0) - cameraY;
    p.camera.z     = (p.world.z || 0) - cameraZ;
    p.screen.scale = cameraDepth/p.camera.z;
    p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
    p

/**
 * Module that handles header buttons
 */
const Header = (() => {
  let idCounter = 0; // Counter for unique IDs

  const init = (options) => {
    options = { ...options }; // Make a copy of options to avoid modifying the original object
    // ... any other initialization code ...
  };

  const options = {}; // Nothing for now

  const canTravel = () => {
    return $('div#header div.headerButton').length > 1;
  };

  const addLocation = (text, module) => {
    const id = `location_${idCounter++}`; // Generate a unique ID
    const button = $('<div>').attr('id', id)
      .addClass('headerButton')
      .text(text)
      .click(() => {
        if (canTravel()) {
          Engine.travelTo(module);
        }
      });
    $('div#header').append(button);
    return button;
  };

  init(); // Initialize the module

  return {
    addLocation,
    canTravel,
  };
})();

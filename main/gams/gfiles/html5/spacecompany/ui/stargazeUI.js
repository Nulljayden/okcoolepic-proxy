// Game.stargazeUI object provides methods to initialize and update the Stargaze UI
Game.stargazeUI = (function() {
  const instance = {}; // The instance object containing all the methods and properties for the Stargaze UI

  // ... (other properties)

  // createTemplate(templateString, data) is a helper function to compile a Handlebars template with given data
  const createTemplate = (templateString, data) => Handlebars.compile(templateString)(data);

  // createDisplay(id, data) is a helper function to create a display for a given id and data
  const createDisplay = (id, data) => {
    instance.tab.addNavEntry(data.category, id); // Add a new navigation entry for the display
    instance.createStargazeNav(data); // Create the Stargaze navigation for the display
    instance.entries[data.htmlId] = data; // Store the display data in the entries object
  };

  // createDMInfo(data, dmInfoData) is a helper function to create DM info for a given data and dmInfoData
  const createDMInfo = (data, dmInfoData) => {
    const tabContentRoot = $(`#${instance.tab.getContentElementId(data.id)}`); // Get the content element for the tab
    const dmInfo = createTemplate(instance.dmInfoTemplate, { ...dmInfoData, id }); // Compile the DM info template
    tabContentRoot.append($(dmInfo)); // Append the compiled template to the content element
  };

  // createUpgrade(data, upgradeData) is a helper function to create an upgrade for a given data and upgradeData
  const createUpgrade = (data, upgradeData) => {
    const tabContentRoot = $(`#${instance.tab.getContentElementId(data.id)}`); // Get the content element for the tab
    const upgrade = createTemplate(instance[upgradeData.category + "Entries"][upgradeData.id], upgradeData); // Compile the upgrade template
    tabContentRoot.append($(upgrade)); // Append the compiled template to the content element
    instance[upgradeData.category + "Entries"][upgradeData.id] = upgradeData; // Store the upgrade data
  };

  // createContent(data) is a helper function to create content for a given data
  const createContent = (data) => {
    const target = $(`#${instance.tab.getContentElementId(data.id)}`); // Get the content element for the tab
    const tabTitle = createTemplate(data.id === "darkMatter" ? instance.dmTitleTemplate : instance.titleTemplate, data); // Compile the title template
    target.append(tabTitle); // Append the compiled template to the content element

    if (data.id === "darkMatter") {
      for (const id in Game.darkMatter) { // Iterate over all the DM data
        const dmInfoData = Game.darkMatter[id]; // Get the DM data
        createDMInfo(data, { ...dmInfoData, id }); // Create DM info for the data
      }
    }

    Object.values(Game.stargaze.upgradeEntries).forEach(upgradeData => { // Iterate over all the upgrade entries
      if (data.id === upgradeData.category) { // If the category matches the current data
        createUpgrade(data, upgradeData); // Create an upgrade for the data
      }
    });
  };

  // createStargazeNav(data) is a helper function to create the Stargaze navigation for a given data
  const createStargazeNav = (data) => {
    const target = $(`#${instance.tab.getNavElementId(data.id)}`); // Get the navigation element for the tab
    createContent(data); // Create the content for the tab

    let html;
    if (data.id === "darkMatter") {
      html = createTemplate(instance.dmNavTemplate, data); // Compile the DM navigation template
    } else {
      html = createTemplate(instance.navTemplate, data); // Compile the regular navigation template
    }
    target.append($(html)); // Append the compiled template to the navigation element
  };

  // initialise() is a method to initialize the Stargaze UI
  instance.initialise = function() {
    // ... (other initialization code)

    for (const id in Game.stargaze.entries) { // Iterate over all the Stargaze entries
      createDisplay(id, Game.stargaze.getStargazeData(id)); // Create a display for the entry
    }
  };

  // update(delta) is a method to update the Stargaze UI
  instance.update = function(delta) {
    // ... (other update code)

    Object.values(Game.stargaze.entries).forEach(data => { // Iterate over all the Stargaze entries
      if (data.displayNeedsUpdate) { // If the display needs updating
       

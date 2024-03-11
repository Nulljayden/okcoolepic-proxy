Game.stargazeUI = (function() {
  const instance = {};

  // ... (other properties)

  // Helper function to create a template
  const createTemplate = (templateString, data) => Handlebars.compile(templateString)(data);

  // Helper function to create a display
  const createDisplay = (id, data) => {
    instance.tab.addNavEntry(data.category, id);
    instance.createStargazeNav(data);
    instance.entries[data.htmlId] = data;
  };

  // Helper function to create a DM info
  const createDMInfo = (data, dmInfoData) => {
    const tabContentRoot = $(`#${instance.tab.getContentElementId(data.id)}`);
    const dmInfo = createTemplate(instance.dmInfoTemplate, { ...dmInfoData, id });
    tabContentRoot.append($(dmInfo));
  };

  // Helper function to create an upgrade
  const createUpgrade = (data, upgradeData) => {
    const tabContentRoot = $(`#${instance.tab.getContentElementId(data.id)}`);
    const upgrade = createTemplate(instance[upgradeData.category + "Entries"][upgradeData.id], upgradeData);
    tabContentRoot.append($(upgrade));
    instance[upgradeData.category + "Entries"][upgradeData.id] = upgradeData;
  };

  // Helper function to create a content
  const createContent = (data) => {
    const target = $(`#${instance.tab.getContentElementId(data.id)}`);
    const tabTitle = createTemplate(data.id === "darkMatter" ? instance.dmTitleTemplate : instance.titleTemplate, data);
    target.append(tabTitle);

    if (data.id === "darkMatter") {
      for (const id in Game.darkMatter) {
        const dmInfoData = Game.darkMatter[id];
        createDMInfo(data, { ...dmInfoData, id });
      }
    }

    Object.values(Game.stargaze.upgradeEntries).forEach(upgradeData => {
      if (data.id === upgradeData.category) {
        createUpgrade(data, upgradeData);
      }
    });
  };

  // Helper function to create a Stargaze nav
  const createStargazeNav = (data) => {
    const target = $(`#${instance.tab.getNavElementId(data.id)}`);
    createContent(data);

    let html;
    if (data.id === "darkMatter") {
      html = createTemplate(instance.dmNavTemplate, data);
    } else {
      html = createTemplate(instance.navTemplate, data);
    }
    target.append($(html));
  };

  // Initialize the stargaze UI
  instance.initialise = function() {
    // ... (other initialization code)

    for (const id in Game.stargaze.entries) {
      createDisplay(id, Game.stargaze.getStargazeData(id));
    }
  };

  // Update the stargaze UI
  instance.update = function(delta) {
    // ... (other update code)

    Object.values(Game.stargaze.entries).forEach(data => {
      if (data.displayNeedsUpdate) {
        // ... (other update code)
      }
    });

    if (Game.stargaze.rebirthNeedsUpdate) {
      // ... (other update code)
    }
  };

  // Initialize the DM
  instance.updateDM = function() {
    // ... (other DM update code)
  };

  // Initialize the UI components
  Game.uiComponents.push(instance);

  return instance;
}());

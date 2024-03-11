var analytics =
{
    enabled: true,

    screens:
    {
        main: 'Main screen',
        about: 'About',
        achievements: 'Achievements',
        info: 'Physics information'
    },

    events:
    {
        categoryResearch: 'Research',
        categoryHR: 'HR',
        categoryUpgrades: 'Upgrades',
        
        actionResearch: 'Research',
        actionHire: 'Hire',
        actionBuy: 'Buy'
    },

    init: function()
    {
        if (typeof Helpers.analytics === 'undefined' || Helpers.analytics == '') {
            analytics.enabled = false;
            return;
        }

        if (typeof ga === 'undefined') {
            console.error('Google Analytics is not defined');
            analytics.enabled = false;
            return;
        }

        ga('create', Helpers.analytics);
        ga('set', { 'appName': 'Particle Clicker', 'appId': 'ch.cern.particle-clicker', 'appVersion': '0.9' });
        ga('set', 'anonymizeIp', true);

        // Helper function to register modal show/hide events
        function registerModalEvent(modalSelector, screenName) {
            $(modalSelector).on('show.bs.modal', function (e) {
                analytics.sendScreen(screenName);
            });
            $(modalSelector).on('hide.bs.modal', function (e) {
                analytics.sendScreen(analytics.screens.main);
            });
        }

        registerModalEvent('#myModal', analytics.screens.about);
        registerModalEvent('#achievements-modal', analytics.screens.achievements);
        registerModalEvent('#infoBox', analytics.screens.info);
    },

    trackScreenView: function(type)
    {
        if (!analytics.enabled || typeof type === 'undefined') {
            return;
        }

        if (typeof ga === 'undefined') {
            console.error('Google Analytics is not defined');
            return;
        }

        ga('send', 'screenview', { 'screenName': type });
    },

    sendEvent: function(category, action, label, value)
    {
        if (!analytics.enabled || typeof category === 'undefined' || typeof action === 'undefined' || typeof label === 'undefined') {
            return;
        }

        value = value || 0; // Set default value for value parameter

        //ga('send', 'event', category, action, label, value, {'screenName': analytics.screens.main });
    }
};

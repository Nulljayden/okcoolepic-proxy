(function () {
    'use strict';

    // Define translation object
    const translations = {
        "water tank": "tangki air",
        "use meds": "pakai peralatan medis",
        "the room is {0}": "ruangan {0}",
        // ... more translations ...
    };

    // Function to get translation
    function _(key) {
        const parts = key.split('.');
        let value = translations;

        for (const part of parts) {
            value = value[part];

            if (value === undefined) {
                return key;
            }
        }

        return value;
    }

    // Export the _ function for use in other modules
    this['_'] = _;
})();

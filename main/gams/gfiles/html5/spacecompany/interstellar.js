// The Game.interstellar module, which is an IIFE (Immediately Invoked Function Expression)
Game.interstellar = (function() {
    let _navCount = 0; // A private variable to keep track of the number of entries

    // An object that contains all the data and methods related to interstellar communications
    const instance = {
        dataVersion: 1, // The version of the data format
        entries: {}, // An object to store all the entries
        comms: (function() {
            const entries = {}; // An object to store the communication entries

            // A function to build a communication machine
            function buildMachine(id) {
                const data = getMachineById(id); // Get the data of the machine
                if (data.count >= data.max) {
                    return; // If the machine has reached its maximum capacity, do nothing
                }
                let resourcePass = 0; // Initialize a variable to track the number of valid resources
                for (const resource of Object.values(data.cost)) { // Iterate over the cost of the machine
                    if (Number.isFinite(window[resource.toString()]) && window[resource.toString()] >= resource) {
                        resourcePass += 1; // If the resource is valid and sufficient, increment the resourcePass counter
                    }
                }
                if (resourcePass === Object.values(data.cost).length) { // If all required resources are valid and sufficient
                    data.count += 1; // Build the machine
                    for (const resource in data.cost) {
                        window[resource.toString()] -= data.cost[resource.toString()]; // Deduct the cost of the machine
                    }
                    data.displayNeedsUpdate = true; // Update the display
                }
            }

            // A function to get the data of a communication machine by its id
            function getMachineDataById(id) {
                return entries[id];
            }

            // A function to initialize the communication machines
            function initialise() {
                for (const id in Game.commsData) { // Iterate over the Game.commsData
                    const data = Game.commsData[id]; // Get the data of a communication machine
                    _navCount++; // Increment the _navCount
                    entries[id] = clone(data, { // Clone the data and add some extra properties
                        id: id,
                        htmlId: 'comm_' + id,
                        count: 0,
                        displayNeedsUpdate: true
                    });
                }
            }

            // Return an object containing all the methods and data of the communication module
            return {
                entries,
                initialise,
                buildMachine,
                getMachineDataById
            };
        })(),
        // The same structure is repeated for antimatter and military modules
        antimatter: (function() {
            const entries = {};

            function buildMachine(id) {
                buildMachine(id);
            }

            function getMachineDataById(id) {
                return entries[id];
            }

            function initialise() {
                for (const id in Game.antimatterData) {
                    const data = Game.antimatterData[id];
                    _navCount++;
                    entries[id] = clone(data, {
                        id: id,
                        htmlId: 'antimatter_' + id,
                        count: 0,
                        displayNeedsUpdate: true
                    });
                }
            }

            return {
                entries,
                initialise,
                buildMachine,
                getMachineDataById
            };
        })(),
        military: (function() {
            const entries = {};

            function buildMachine(id) {
                buildMachine(id);
            }

            function getMachineDataById(id) {
                return entries[id];
            }

            function initialise() {
                for (const id in Game.militaryData) {
                    const data = Game.militaryData[id];
                    _navCount++;
                    entries[id] = clone(data, {
                        id: id,
                        htmlId: 'milit_' + id,
                        count: 0,
                        active: 0,
                        displayNeedsUpdate: true
                    });
                }
            }

            return {
                entries,
                initialise,
                buildMachine,
                getMachineDataById
            };
        })()
    };
})();

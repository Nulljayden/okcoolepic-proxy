Game.interstellar = (function () {
    let _navCount = 0;

    const instance = {
        dataVersion: 1,
        entries: {},
        comms: (function () {
            const entries = {};

            function buildMachine(id) {
                const data = getMachineById(id);
                if (data.count >= data.max) {
                    return;
                }
                let resourcePass = 0;
                for (const resource of Object.values(data.cost)) {
                    if (Number.isFinite(window[resource.toString()]) && window[resource.toString()] >= resource) {
                        resourcePass += 1;
                    }
                }
                if (resourcePass === Object.values(data.cost).length) {
                    data.count += 1;
                    for (const resource in data.cost) {
                        window[resource.toString()] -= data.cost[resource.toString()];
                    }
                    data.displayNeedsUpdate = true;
                }
            }

            function getMachineDataById(id) {
                return entries[id];
            }

            function initialise() {
                for (const id in Game.commsData) {
                    const data = Game.commsData[id];
                    _navCount++;
                    entries[id] = clone(data, {
                        id: id,
                        htmlId: 'comm_' + id,
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
        antimatter: (function () {
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
        military: (function () {
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
              

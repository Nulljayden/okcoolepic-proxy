class RandomBag {
    // start off empty
    available: string[];
    queue: string[];
    size: number;

    constructor(initialQueueSize: number) {
        // initialize by refilling the queue
        this.available = RandomBag.initialList.slice(0); // shallow copy
        this.queue = [];
        this.size = 0;

        while (this.size < initialQueueSize && this.available.length > 0) {
            this.queue.push(this.nextAvailable());
            this.size++;
        }

        if (this.size < initialQueueSize) {
            throw new Error(`Cannot initialize RandomBag with a queue size of ${initialQueueSize} as the initial list only has ${RandomBag.initialList.length} elements.`);
        }
    }

    static initialList: string[] = ['i', 'o', 'j', 'l', 'z', 's', 't'];

    /**
     * Returns the letters of the queue in order of oldest to newest
     * @returns {string[]} the letters of the queue
     */
    getQueue(): string[] {
        return this.queue;
    }

    /**
     * Gets the next letter for the queue, and updates the random bag state
     * @returns {string} the next letter for the queue
     * @private
     */
    private nextAvailable(): string {
        const index = Math.floor(Math.random() * this.available.length);
        const res = this.available.splice(index, 1

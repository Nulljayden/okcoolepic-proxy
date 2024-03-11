class RandomBag {
    // The 'available' array stores the remaining elements that have not been added to the queue yet.
    available: string[];
    // The 'queue' array holds the elements in the order they were added, with the oldest element at index 0.
    queue: string[];
    // The 'size' property keeps track of the current number of elements in the queue.
    size: number;

    constructor(initialQueueSize: number) {
        // Initialize the 'available' array with a shallow copy of the static 'initialList' to avoid modifying the original list.
        this.available = RandomBag.initialList.slice(0);
        this.queue = [];
        this.size = 0;

        while (this.size < initialQueueSize && this.available.length > 0) {
            // Add elements from the 'available' array to the 'queue' until the desired queue size is reached or there are no more elements in 'available'.
            this.queue.push(this.nextAvailable());
            this.size++;
        }

        if (this.size < initialQueueSize) {
            // Throw an error if the desired queue size cannot be achieved due to the limited number of elements in 'initialList'.
            throw new Error(`Cannot initialize RandomBag with a queue size of ${initialQueueSize} as the initial list only has ${RandomBag.initialList.length} elements.`);
        }
    }

    // A static property that defines the initial list of elements for the RandomBag.
    static initialList: string[] = ['i', 'o', 'j', 'l', 'z', 's', 't'];

    /**
     * Returns the letters of the queue in order of oldest to newest.
     * @returns {string[]} the letters of the queue
     */
    getQueue(): string[] {
        return this.queue;
    }

    /**
     * Gets the next letter for the queue, and updates the random bag state.
     * @returns {string} the next letter for the queue
     * @private
     */
    private nextAvailable(): string {
        // Generate a random index to select an element from the 'available' array.
        const index = Math.floor(Math

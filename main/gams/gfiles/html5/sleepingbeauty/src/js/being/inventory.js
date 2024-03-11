import * as pubsub from "util/pubsub.js";

/**
 * The Inventory class manages a list of items and provides methods to interact with the list.
 */
export default class Inventory {
	/**
	 * Creates an empty inventory.
	 */
	constructor() {
		this._items = []; // List to store the items.
	}

	/**
	 * Returns the list of items in the inventory.
	 * @returns {Array} The list of items.
	 */
	getItems() {
		return this._items;
	}

	/**
	 * Returns the first item with the given type from the inventory.
	 * @param {string} type - The type of the item to find.
	 * @returns {Object|undefined} The item with the given type or undefined if not found.
	 */
	getItemByType(type) {
		return this._items.filter(i => i.getType() == type)[0]; // Filter items by type and return the first one.
	}

	/**
	 * Removes the given item from the inventory.
	 * @param {Object} item - The item to remove.
	 * @returns {Object} The inventory itself for chaining.
	 */
	removeItem(item) {
		let index = this._items.indexOf(item); // Get the index of the item in the list.
		if (index > -1) { this._items.splice(index, 1); } // Remove the item from the list.
		pubsub.publish("status-change"); // Notify subscribers about the status change.
		return this;
	}

	/**
	 * Adds an item to the inventory.
	 * @param {Object} item - The item to add.
	 * @returns {Object} The inventory itself for chaining.
	 */
	addItem(item) {
		this._items.push(item); // Add the item to the list.
		pubsub.publish("status-change"); // Notify subscribers about the status change.
		return this;
	}
}

``

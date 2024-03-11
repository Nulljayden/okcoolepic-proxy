export const BLOCKS_NONE = 0;
export const BLOCKS_MOVEMENT = 1;
export const BLOCKS_LIGHT = 2;

export default class Entity {
	constructor(visual) {
		this._visual = visual;
		this.blocks = BLOCKS_NONE; 
	}

	getVisual() { return this._visual; }

	toString() { return this._visual.name; }

	describe(articleType) {
		if (!articleType || !this[`describe${articleType}`]) {
			throw new Error(`Invalid article type: ${articleType}`);
	

import XY from "util/xy.js";
import { ATTACK_1, ATTACK_2, MAGIC_1, MAGIC_2, COLORS } from "combat/types.js";

const CELL = 30;
const CTX = document.createElement("canvas").getContext("2d");
const LEGEND = document.createElement("ul");

const LABELS = {
	[ATTACK_1]: "You attack",
	[ATTACK_2]: "Enemy attacks",
	[MAGIC_1]: "You attack (magic)",
	[MAGIC_2]: "Enemy attacks (magic)"
}

function buildLegend() {
	if (!LEGEND || !(LEGEND instanceof HTMLUListElement)) {
		throw new Error("LEGEND element not found");
	}

	[ATTACK_1, ATTACK_2, MAGIC_1, MAGIC_2].forEach(id => {
		const li = document.createElement("li");
		LEGEND.append(li);
		li.dataset.id = id;
		const hash = document.createElement("span");
		hash.style.color = COLORS[id];
	

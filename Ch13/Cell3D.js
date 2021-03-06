"use strict";

class Cell3D extends Cell {
	constructor(level, row, column) {
		super(row, column)
		this.level = level
	}

	neighbors() {
		let list = super.neighbors()
		if (this.up)   list.push(this.up)
		if (this.down) list.push(this.down)
		return list
	}

	get_id() {
		return this.level + '#' + this.row + '#' + this.column
	}
}
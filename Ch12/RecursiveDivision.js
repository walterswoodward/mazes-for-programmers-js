class RecursiveDivision {
	on(grid) {
		this.grid = grid

		let cell_gen = this.grid.each_cell()
		while (true) {
			let cell = cell_gen.next().value
			if (!cell) break
			cell.neighbors().forEach(c => cell.link(c, false))
		}

		this.divide(0, 0, this.grid.rows, this.grid.columns)
	}

	divide(row, column, height, width) {
		// if (height <= 1 || width <= 1) return
		if (height <= 1 || width <= 1 || height < 5 && width < 5 && Math.random() < 0.25) return

		if (height > width) {
			this.divide_horizontally(row, column, height, width)
		}
		else {
			this.divide_vertically(row, column, height, width)
		}
	}

	divide_horizontally(row, column, height, width) {
		let divide_south_of = Math.floor(Math.random() * (height - 1))
		let passage_at = Math.floor(Math.random() * width)

		for (let x = 0; x < width; x += 1) {
			if (passage_at == x) continue

			let cell = this.grid.get_cell(row+divide_south_of, column+x)
			cell.unlink(cell.south)
		}

		this.divide(row, column, divide_south_of+1, width)
		this.divide(row+divide_south_of+1, column, height-divide_south_of-1, width)
	}

	divide_vertically(row, column, height, width) {
		let divide_east_of = Math.floor(Math.random() * (width - 1))
		let passage_at = Math.floor(Math.random() * height)

		for (let y = 0; y < height; y += 1) {
			if (passage_at == y) continue

			let cell = this.grid.get_cell(row+y, column+divide_east_of)
			cell.unlink(cell.east)
		}

		this.divide(row, column, height, divide_east_of+1)
		this.divide(row, column+divide_east_of+1, height, width-divide_east_of-1)
	}
}
"use strict";

class Board {
	constructor(size) {
		this.hasSunk = true;
		this.size = size;
		this.grid = [];
		for (var i = 0; i < size; i++) {
			this.grid[i] = [];
			for (var j = 0; j < size; j++) {
				this.grid[i][j] = "not shot";
			}
		}
		this.createInitialShootArray();
		this.alreadyShot = [];
	}

	createInitialShootArray() {
		function shuffle(arr) {
			for (var i = arr.length; i > 0; i--) {
				var rand = Math.floor(Math.random()*i);
				var tmp = arr[i-1];
				arr[i-1] = arr[rand];
				arr[rand] = tmp;
			}
			return arr;
		};

		var initPattern = [];
		for (var y = 0; y < this.size; y++) {
			for (var x = 0; x < this.size; x++) {
				if ((x+y) % 4 == 0) {
					initPattern.push({x, y});
				}
			}
		}
		initPattern = shuffle(initPattern);

		var secondary = [];
		for (var y = 0; y < this.size; y++) {
			for (var x = 0; x < this.size; x++) {
				if ((x+y) % 2 == 0) {
					secondary.push({x, y});
				}
			}
		}
		secondary = shuffle(secondary);

		var trinary = [];
		for (var y = 0; y < this.size; y++) {
			for (var x = 0; x < this.size; x++) {
				if ((x+y) % 2 != 0) {
					trinary.push({x, y});
				}
			}
		}
		trinary = shuffle(trinary);

		this.shootArray = initPattern.concat(secondary).concat(trinary);
	}

	get shotCoords() {
		var alreadyShot = false;
		var coords = null;
		do {
			alreadyShot = false;
			coords = this.shootArray.shift();

			for (var i = 0; i < this.alreadyShot.length; i++) {
				if (this.alreadyShot[i].x == coords.x && this.alreadyShot[i].y == coords.y) {
					alreadyShot = true;
					break;
				}
			}
		} while (alreadyShot);

		this.alreadyShot.push(coords);
		return coords;
	}

	result(c, data) {
		this.grid[c.y][c.x] = data.hit;

		var newcords = [{x: c.x,y:c.y-1}, {x:c.x+1,y:c.y}, {x:c.x, y:c.y+1},{x:c.x-1,y:c.y}];

		if (data.hit == "BANG") {
			// if (this.hasSunk) {
				if (c.x == 0 && c.y == 0) {
					newcords.splice(3,1)
					newcords.splice(0,1);
				} else if (c.x == 0){
					newcords.splice(3,1);
				} else if(c.y == 0) {
					newcords.splice(0,1);
				} else if(c.x == (this.size-1) && c.y == (this.size-1)) {
					newcords.splice(2,1);
					newcords.splice(1,1);
				} else if (c.x == (this.size-1)) {
					newcords.splice(1,1);
				} else if(c.y == (this.size-1)) {
					newcords.splice(2,1);
				} else if (c.x == 0 && c.y == (this.size-1)) {
					newcords.splice(3,1);
					newcords.splice(2,1);
				} else if (c.x == (this.size-1) && c.y == 0) {
					newcords.splice(1,1);
					newcords.splice(0,1);
				}
				this.shootArray = newcords.concat(this.shootArray);
				// this.hasSunk = false;
			// } else {
			//
			// }
		} else if (data.hit == "SUNK") {

		} else {

		}
	}
}

module.exports = Board;

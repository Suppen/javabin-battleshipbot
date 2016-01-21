function placeShips(ws, size, shipLengths) {
	var ships = [];

	var i = 0;
	while (i < shipLengths.length) {
		var ship = makeShip(shipLengths[i], size);
		if (!isColliding(ships, ship)) {
			ships.push(ship);
			i++;
		}
	}

	for (var i = 0; i < ships.length; i++) {
		ws.send(JSON.stringify({
			"class": "game.messages.SetShipMessage",
			"ship": {
				"coordinates": ships[i]
			}
		}));
	}
}

function makeShip(shipLength, size) {
	var ship = [];

	var direction = Math.random() > 0.5;

	if (direction) {
		var startX = Math.floor(Math.random() * size);
		var startY = Math.floor(Math.random() * (size - shipLength));

		for (var i = 0; i < shipLength; i++) {
			ship.push({x: startX, y: startY+i});
		}
	} else {
		var startX = Math.floor(Math.random() * (size - shipLength));
		var startY = Math.floor(Math.random() * size);

		for (var i = 0; i < shipLength; i++) {
			ship.push({x: startX+i, y: startY});
		}
	}

	return ship;
}

function isColliding(ships, shipB) {
	var colliding = false;
	for (var i = 0; i < ships.length; i++) {
		var shipA = ships[i];
		for (var j = 0; j < shipB.length; j++) {
			for (var k = 0; k < shipA.length; k++) {
				if (shipA[k].x == shipB[j].x && shipA[k].y == shipB[j].y) {
					colliding = true;
				}
			}
		}
	}
	return colliding;
}

module.exports = placeShips;

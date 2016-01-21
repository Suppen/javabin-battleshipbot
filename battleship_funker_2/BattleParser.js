"use strict";

var EventEmitter = require("events");
// var util = require("util");

class BattleParser extends EventEmitter{

    constructor() {
        super();
    }

    parse(string) {
        var json = JSON.parse(string);
        var classes = {
            "game.broadcast.GameIsInPlanningMode": "placeships",
            "game.broadcast.GameIsStarted": "waitingforturn",
            "game.messages.ItsYourTurnMessage": "yourturn",
            "game.broadcast.GameOver": "gameover",
            "game.result.ShootResult": "shot"
        };

        if (json.class in classes) {
            this.emit(classes[json.class], json);
        }
    }
}

// util.inherits(BattleParser, EventEmitter);

module.exports = BattleParser;

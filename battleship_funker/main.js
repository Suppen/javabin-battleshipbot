var fs = require("fs");
var WebSocket = require("ws");
var BattleParser = require("./BattleParser");
var Board = require("./Board");

var token = JSON.parse(fs.readFileSync("token.json"));
var user = process.argv[2] || "suppen";

if (!(user in token)) {
    throw Error("Invalid user '"+user+"'");
} else {
    token = token[user];
}
var ws = new WebSocket("ws://battle.codes/connect", {
    headers: {
        "Authorization": "Bearer " + token
    }
});

ws.on("open", function() {
    console.log("Connected");
});

var battle = new BattleParser();
var board;

ws.on("message", function(msg) {
    // console.log(msg);
    battle.parse(msg);
});

battle.on("placeships", function(data) {
    // console.log("Placing ships", data);
    require("./ship_placer")(ws, 12, [2, 3, 3, 4, 4, 5]);
    board = new Board(12);
});


battle.on("waitingforturn", function() {
    console.log("Waiting for turn");
});

var cords;
battle.on("yourturn", function() {
    cords = board.shotCoords;
    ws.send(JSON.stringify({
        "class": "game.messages.ShootMessage",
        "coordinate": cords
    }));
});

battle.on("shot", function(data) {
    board.result(cords, data);
    // commandor.shootResult(data.hit);
});

battle.on("gameover", function(data) {
    console.log("GAME OVER!", "Congratulations "+data.andTheWinnerIs);
})

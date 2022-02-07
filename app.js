const displayLogic = require("./game-engine/displayLogic");
var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

let grid = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];
let gridFinal = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
let numberOfVisitors = 0;
let value = 100;
let names = new Map();
let flag = true;
let player1 = null;
let player2 = null;

wss.on("connection", function (ws, req) {
  console.log("Welcome to the world of TIC-TAC-TOE");

  ws.on("message", function (message) {
    let messageFromClient = message.toString();

    console.log(messageFromClient);

    if (flag && isMessageFromClientAName(messageFromClient)) {
      player1 = messageFromClient.split(" ")[1];
      names.set(player1, "X");
      numberOfVisitors++;
      flag = false;
    } else if (isMessageFromClientAName(messageFromClient)) {
      player2 = messageFromClient.split(" ")[1];
      names.set(player2, "O");
      numberOfVisitors++;
    }

    if (messageFromClient.split(" ")[1] == "name") {
      const nameOfPlayer = messageFromClient.split(" ")[2];
      const symbolOfPlayer = names.get(nameOfPlayer);
      console.log("symbolOfPlayer", symbolOfPlayer);
      displayLogic(wss, value, gridFinal, messageFromClient, symbolOfPlayer);
    }
  });
});

function isMessageFromClientAName(name) {
  if (name[0] == "N" && name[1] == "A" && name[2] == "M" && name[3] == "E")
    return true;
}

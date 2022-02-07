const findTurn = require("./game-engine/findTurn");
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
let clientMap = new Map();
let reverseClientMap = new Map();
let names = new Set();

wss.on("connection", function (ws, req) {
  console.log("Welcome to the world of TIC TAC TOE");
  ws.on("message", function (message) {
    let messageFromClient = message.toString();
    flag = true;
    if (flag && isMessageFromClientAName(messageFromClient)) {
      let player1 = messageFromClient.split(" ")[1];
      names.add({ [player1]: "X" });
      flag = false;
    } else if (isMessageFromClientAName(messageFromClient)) {
      let player2 = messageFromClient.split(" ")[1];
      names.add({ [player2]: "O" });
    } else {
      let { turn, visitors } = findTurn(messageFromClient, numberOfVisitors);
      numberOfVisitors = visitors;
      if (visitors < 2) {
        console.log("waiting for other player to join");
      } else {
        if (messageFromClient == "Player") {
        } else {
          console.log(names);
          displayLogic(wss, value, gridFinal, messageFromClient, turn);
        }
      }
    }
  });
});

function isMessageFromClientAName(name) {
  if (name[0] == "N" && name[1] == "A" && name[2] == "M" && name[3] == "E")
    return true;
}

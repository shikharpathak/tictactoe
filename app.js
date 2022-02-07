const findTurn = require("./game-engine/findTurn");
const displayLogic = require("./game-engine/displayLogic");
var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

let grid = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];
let numberOfVisitors = 0;
let value = 100;
let clientMap = new Map();
let reverseClientMap = new Map();

wss.on("connection", function (ws, req) {
  console.log("Waiting for Players to join");
  ws.on("message", function (message) {
    let messageFromClient = message.toString();
    flag = true;
    if (flag && isMessageFromClientAName(messageFromClient)) {
      clientMap.set(messageFromClient.split(" "), "X");
      flag = false;
    }
    if (isMessageFromClientAName(messageFromClient)) {
      clientMap.set(messageFromClient.split(" "), "O");
    } else {
      let { turn, visitors } = findTurn(messageFromClient, numberOfVisitors);
      numberOfVisitors = visitors;
      if (visitors < 2) {
        console.log(visitors);
        console.log("waiting for other player to join");
      } else displayLogic(wss, value, grid, messageFromClient, turn);
    }
  });
});

function isMessageFromClientAName(name) {
  if (name[0] == "N" && name[1] == "A" && name[2] == "M" && name[3] == "E")
    return true;
}

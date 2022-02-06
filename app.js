const assignStatus = require("./game-engine/assignStatus");
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
    let turn = assignStatus(messageFromClient, numberOfVisitors);
    if (numberOfVisitors < 2) {
      console.log("waiting for other player to join");
    } else displayLogic(wss, value, grid, clientMap, reverseClientMap, turn);
  });
});

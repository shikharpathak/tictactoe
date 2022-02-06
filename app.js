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
  ws.on("message", function (message) {
    let messageFromClient = message.toString();
    assignStatus(messageFromClient, numberOfVisitors);
    if (numberOfVisitors < 2) {
      console.log("waiting for other player to join");
    } else displayLogic();
  });
});

function assignStatus(messageFromClient, numberOfVisitors) {
  if (messageFromClient == "Player" && numberOfVisitors <= 1) {
    numberOfVisitors++;
    clientMap.set("X", ws);
    reverseClientMap.set(ws, "X");
  } else if (messageFromClient == "Player" && numberOfVisitors == 1) {
    numberOfVisitors++;
    clientMap.set("O", ws);
    reverseClientMap.set(ws, "O");
  } else {
    clientMap.set("#", ws);
    reverseClientMap.set(ws, "#");
  }
}

function displayLogic() {
  value = Number(messageFromClient) - 1;
  numberOfMoves++;
  grid[Math.floor(value / 3)][value % 3] = reverseClientMap.get(ws) ? "X" : "O";
  wss.clients.forEach(function each(client) {
    client.send(
      `\n\n\n${grid[0].join("   ")} \n\n\n${grid[1].join(
        "   "
      )} \n\n\n${grid[2].join("   ")} \n\n\n`
    );
  });
}

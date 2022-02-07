const { Socket } = require("socket.io");
const displayLogic = require("./game-engine/displayLogic");
var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

let gridFinal = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
let numberOfVisitors = 0;
let value = 100;

let symbol = null;
wss.on("connection", function (ws, req) {
  console.log("Welcome to TIC-TAC-TOE");
  const assignment = ["X", "O"];
  symbol = numberOfVisitors < 2 ? assignment[numberOfVisitors] : "#";
  numberOfVisitors++;
  ws.send(`symbol ${symbol}`);

  ws.on("message", function (message) {
    let messageFromClient = message.toString();

    {
      const splitMessage = messageFromClient.split(" ");
      console.log("nameOfPlayer -> ", splitMessage);
      const symbolOfPlayer = splitMessage[0];
      value = Number(messageFromClient) - 1;
      gridFinal[splitMessage[1]] = symbolOfPlayer;
      wss.clients.forEach(function each(client) {
        client.send(
          `\n ${gridFinal.slice(0, 3).join(" | ")} \n\n ${gridFinal
            .slice(3, 6)
            .join(" | ")} \n\n ${gridFinal.slice(6, 9).join(" | ")}  \n `
        );
      });
    }
  });
});

// TODO(priyanshsaxena): if numberofVisitors ==1: socket.send("Awiting second player");

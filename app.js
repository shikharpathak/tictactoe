const getHash = require("./game-engine/mapper");

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

let gridFinal = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
let numberOfVisitors = 0;
let value = 100;
positions = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
let symbol = null;
wss.on("connection", function (ws, req) {
  const assignment = ["X", "O"];
  symbol = numberOfVisitors < 2 ? assignment[numberOfVisitors] : "#";
  numberOfVisitors++;
  ws.send(`symbol ${symbol}`);
  // if (numberOfVisitors < 2) {
  //   ws.send("Waiting for Player 2 to join");
  // } else
  {
    ws.on("message", function (message) {
      const messageFromClient = message.toString();

      const splitMessage = messageFromClient.split(" ");

      const symbolOfPlayer = splitMessage[0];

      value = Number(splitMessage[1]) - 1;

      if (
        symbolOfPlayer == "X" ||
        (symbolOfPlayer == "O" && positions.has(value))
      ) {
        positions.delete(value);

        const gameState = winningLogic(symbolOfPlayer, value + 1);

        if (gameState == "O has won " || gameState == "X has won") {
          ws.close(1000, gameState);
          wss.on("close", function close() {
            ws.send(gameState);
          });
        }

        gridFinal[value] = symbolOfPlayer;

        wss.clients.forEach(function each(client) {
          client.send(
            `\n ${gridFinal.slice(0, 3).join(" | ")} \n\n ${gridFinal
              .slice(3, 6)
              .join(" | ")} \n\n ${gridFinal.slice(6, 9).join(" | ")}  \n `
          );
        });
      }
    });
  }
});
const positionsOf_X = [];
const positionsOf_O = [];
function winningLogic(turn, position) {
  const winningSum = [41, 71, 109, 75, 71];

  hash = getHash(position);

  if (turn == "X") {
    positionsOf_X.push(hash);
    const currentSum = positionsOf_X.reduce(
      (previous, current) => previous + current
    );
    const found = winningSum.find((sum) => sum === currentSum);
    return found == currentSum ? "X has won " : " Continue";
  }

  positionsOf_O.push(hash);
  currentSum = positionsOf_O.reduce((previous, current) => previous + current);
  const found = winningSum.find((sum) => sum === currentSum);
  return found == currentSum ? "O has won " : " Continue";
}

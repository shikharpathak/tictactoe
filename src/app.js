// const getHash = require("./game-engine/mapper");

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });
const hashMap = new Map();

hashMap.set("1", 11);
hashMap.set("2", 13);
hashMap.set("3", 17);
hashMap.set("4", 19);
hashMap.set("5", 23);
hashMap.set("6", 29);
hashMap.set("7", 31);
hashMap.set("8", 37);
hashMap.set("9", 41);

function getHash(key) {
  return hashMap.get(key.toString());
}

let gridFinal = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
let numberOfVisitors = 0;
let value = 100;
positions = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
let symbol = null;
const winX = "X has won";
const winO = "O has won";
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
        console.log(positions);

        const gameState = winningLogic(symbolOfPlayer, value + 1);
        console.log(gameState);
        if (gameState == winO || gameState == winX) {
          console.log("END GAME");
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
let positionsOf_X = [];
let positionsOf_O = [];
function winningLogic(turn, position) {
  const winningSum = [41, 71, 109, 75, 71];

  hash = getHash(position);

  if (turn == "X") {
    positionsOf_X.push(hash);
    positionsOf_X = positionsOf_X.filter((element) => {
      return element !== undefined;
    });

    console.log(positionsOf_X);
    const currentSum = positionsOf_X.reduce(
      (previous, current) => previous + current,
      0
    );
    console.log("current", currentSum);
    const found = winningSum.find((sum) => sum === currentSum);
    console.log(found);
    if (found >= 41 && found <= 110)
      return found == currentSum ? winX : " Continue";
  }

  positionsOf_O.push(hash);
  positionsOf_O = positionsOf_O.filter((element) => {
    return element !== undefined;
  });
  currentSum = positionsOf_O.reduce(
    (previous, current) => previous + current,
    0
  );

  const found = winningSum.find((sum) => sum === currentSum);
  if (found >= 41 && found <= 110)
    return found == currentSum ? winO : " Continue";
}

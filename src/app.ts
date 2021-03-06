const winningLogic = require("./game-engine/winningLogic");
const displayGrid = require("./helper/displayGrid");
const getHashedValue = require("./helper/getHashedValue");
const removeAllClients = require("./helper/removeAllClients.ts");

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

let positionsOf_X: number[] = [];
let positionsOf_O: number[] = [];
let grid = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
let numberOfVisitors = 0;
let value = 100;
let positions = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
let symbol = null;

const hashedMap = new Map();
hashedMap.set("1", 11);
hashedMap.set("2", 13);
hashedMap.set("3", 17);
hashedMap.set("4", 19);
hashedMap.set("5", 23);
hashedMap.set("6", 29);
hashedMap.set("7", 31);
hashedMap.set("8", 37);
hashedMap.set("9", 41);

wss.on("connection", function (ws: any) {
  console.log("TIC TAC TOE");
  const assignment = ["X", "O"];
  symbol = numberOfVisitors < 2 ? assignment[numberOfVisitors] : "#";
  numberOfVisitors++;
  ws.send(`symbolOfPlayer ${symbol}`);
  // if (numberOfVisitors < 2) {
  //   ws.send("Waiting for Player 2 to join");
  // } else
  {
    ws.on("message", function (message: any) {
      const messageFromClient = message.toString();

      const splitMessage = messageFromClient.split(" ");

      const symbolOfPlayer = splitMessage[0];

      value = Number(splitMessage[1]) - 1;
      if (
        symbolOfPlayer == "X" ||
        (symbolOfPlayer == "O" && positions.has(value))
      ) {
        positions.delete(value);
        console.log("very much here");
        const gameState = winningLogic(
          value + 1,
          positionsOf_X,
          positionsOf_X,
          hashedMap
        );
        if (gameState == "X has won" || gameState == "O has won") {
          console.log("END GAME");

          ws.send(`${gameState} END GAME`);

          grid[value] = symbolOfPlayer;

          ws.send(displayGrid(wss, grid));

          removeAllClients(wss);
        }

        grid[value] = symbolOfPlayer;

        displayGrid(wss, grid);
      }
    });
  }
});

"use strict";
const winningLogic = require("../game-engine/gameLogic");
const displayGrid = require("./helper/displayGrid");
// const getHashedValue = require("./helper/getHashedValue");
const removeAllClients = require("./helper/removeAllClients.ts");
var WebSocketServer = require("ws").Server, wss = new WebSocketServer({ port: 8080 });
let positionsOf_X = [];
let positionsOf_O = [];
let grid = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
let numberOfVisitors = 0;
let value = 100;
let positions = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
let symbol = null;
const winX = "X has won";
const winO = "O has won";
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
wss.on("connection", function (ws, req) {
    console.log("TIC TAC TOE");
    const assignment = ["X", "O"];
    symbol = numberOfVisitors < 2 ? assignment[numberOfVisitors] : "#";
    numberOfVisitors++;
    ws.send(`symbolOfPlayer ${symbol}`);
    // if (numberOfVisitors < 2) {
    //   ws.send("Waiting for Player 2 to join");
    // } else
    {
        ws.on("message", function (message) {
            const messageFromClient = message.toString();
            const splitMessage = messageFromClient.split(" ");
            const symbolOfPlayer = splitMessage[0];
            value = Number(splitMessage[1]) - 1;
            if (symbolOfPlayer == "X" ||
                (symbolOfPlayer == "O" && positions.has(value))) {
                positions.delete(value);
                const gameState = winningLogic(value + 1, positionsOf_X, positionsOf_X, hashedMap);
                if (gameState == winX || gameState == winO) {
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
// function winningLogic(turn, position) {
//   const winningSum = [41, 71, 109, 75, 71];
//   let hashedValue = getHashedValue(hashedMap, position);
//   if (turn == "X") {
//     positionsOf_X.push(hashedValue);
//     positionsOf_X = positionsOf_X.filter((element) => {
//       return element !== undefined;
//     });
//     const currentSum = positionsOf_X.reduce(
//       (previous, current) => previous + current,
//       0
//     );
//     const found = winningSum.find((sum) => sum === currentSum);
//     if (found >= 41 && found <= 110)
//       return found == currentSum ? winX : " Continue";
//   }
//   positionsOf_O.push(hashedValue);
//   positionsOf_O = positionsOf_O.filter((element) => {
//     return element !== undefined;
//   });
//   const currentSum = positionsOf_O.reduce(
//     (previous, current) => previous + current,
//     0
//   );
//   const found = winningSum.find((sum) => sum === currentSum);
//   if (found >= 41 && found <= 110)
//     return found == currentSum ? winO : " Continue";
// }

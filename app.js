var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

const arrMessage = [];
let grid = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
let value = 100;
let numberOfMoves = 0;
wss.on("connection", function (ws, req) {
  console.log("=============");
  ws.send("SERVER LIKES YOU");
  ws.on("message", function (message) {
    arrMessage.push(message);
    value = Number(message.toString()) - 1;
    numberOfMoves++;
    grid[value] = numberOfMoves % 2 == 1 ? "X" : "O";
    console.log(grid);
    wss.clients.forEach(function each(client) {
      client.send(message.toString());
    });
  });
});
// const arr = [1, 2, 3];
// function gameLogic(arr) {
//   if (isSubArray) {
//   }
// }

// function isSubArray(A, B, n, m) {
//   const array = A.sort();

//   var i = 0,
//     j = 0;
//   while (i < n && j < m) {
//     if (A[i] == B[j]) {
//       i++;
//       j++;
//       if (j == m) return true;
//     } else {
//       i = i - j + 1;
//       j = 0;
//     }
//   }
//   return false;
// }
// const winningArrays = [
//   [11, 13, 17],
//   [19, 23, 29],
//   [31, 37, 41],
//   [11, 23, 41],
//   [17, 23, 31],
// ];
// const winningSum = [41, 71, 109, 75, 71];
// winningSum.find();

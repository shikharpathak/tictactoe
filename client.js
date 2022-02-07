const WebSocket = require("ws");
const inquirer = require("inquirer");
const getHash = require("./game-engine/mapper");

let answers = [];
let moves = [];
let hashedMoves = [];
const nameOfPlayer = process.argv[4];
let symbol = "#";
async function connect(address, port) {
  console.log(`Attempting to connect to ${address} at ${port}...`);
  socket = new WebSocket(`ws://${address}:${port}`);

  socket.onopen = async function (ws) {
    console.log("Socket connected successfully");
    symbol = ws;
    socket.on("message", (message) => {
      if (message.toString().split(" ")[0] == "symbol")
        symbol = message.toString().split(" ")[1];
      console.log(message.toString());
    });
    socket.send(`NAME ${nameOfPlayer.toString()}`);
    playerOrSpectator = await inquirer.prompt({
      name: "Question",
      type: "list",
      message: "How would you like to join ?",
      choices: ["Player", "Spectator"],
      default() {
        return "Your Choice";
      },
    });
    socket.send(playerOrSpectator.Question);
  };
}

async function nextMove() {
  while (answers == null || answers.Move != 10) {
    answers = await inquirer.prompt({
      message: "What is your next move?",
      name: "Move",
      type: "input",
      default() {
        return "Enter a number 0- 8";
      },
    });
    moves.push(getHash(answers.Move));
    hashedMoves.push(answers.Move);
    socket.send(`${symbol} ${answers.Move}`);
  }
}
connect(process.argv[2], process.argv[3]);
nextMove();

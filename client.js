const WebSocket = require("ws");
const inquirer = require("inquirer");
const getHash = require("./game-engine/mapper");

let answers = [];
let moves = [];
let hashedMoves = [];

async function connect(address, port, name) {
  console.log(`Attempting to connect to ${address} at ${port}...`);
  socket = new WebSocket(`ws://${address}:${port}`);
  console.log(`${name}'s attempt successful.....`);

  socket.onopen = async function (ws) {
    console.log("Socket connected successfully");
    socket.on("message", (message) => {
      console.log(message.toString());
    });
    socket.send(`NAME ${name}`);

    playerOrSpectator = await inquirer.prompt({
      name: "Question",
      type: "list",
      message: "How would you like to join ?",
      choices: ["Player", "Spectator"],
      default() {
        return "Player";
      },
    });
    console.log(playerOrSpectator);
    socket.send(playerOrSpectator.Question);
  };

  nextMove();
}

async function nextMove() {
  while (answers == null || answers.Move != 10) {
    answers = await inquirer.prompt({
      message: "What is your next move?",
      name: "Move",
      type: "input",
      default() {
        return "Enter a number 1- 9";
      },
    });
    moves.push(getHash(answers.Move));
    hashedMoves.push(answers.Move);

    setTimeout(() => {
      socket.send(answers.Move);
    }, 0);
  }
}

connect(process.argv[2], process.argv[3], process.argv[4]);

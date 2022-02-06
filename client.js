const WebSocket = require("ws");
const inquirer = require("inquirer");
const getHash = require("./mapper");

let answers = [];
let moves = [];
let hashedMoves = [];

async function connect(address, port) {
  console.log(`Attempting to connect to ${address} at ${port}...`);
  socket = new WebSocket(`ws://${address}:${port}`);
  console.log(`Attempting successful to ${address} at ${port}...`);
  socket.onopen = async function (ws) {
    console.log("Socket connected successfully");
    playerOrSpectator = await inquirer.prompt({
      name: "Question 1",
      type: "list",
      message: "How would you like to join ?",
      choices: ["Player", "Spectator"],
      default() {
        return "Player";
      },
    });
    socket.send(playerOrSpectator);
  };
  socket.on("message", (message) => {
    console.log(message.toString());
  });
  askName();
}

async function askName() {
  while (answers == null || answers.Move != 10) {
    answers = await inquirer.prompt({
      message: "What is your next move?",
      name: "Move",
      type: "input",
      default() {
        return "Enter a number 1- 9";
      },
    });
    // isValid();
    moves.push(getHash(answers.Move));
    hashedMoves.push(answers.Move);

    setTimeout(() => {
      socket.send(answers.Move);
    }, 0);
  }
}

const arguments = process.argv.splice(2);
connect(arguments[0], arguments[1]);

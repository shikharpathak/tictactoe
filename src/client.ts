const webSocket = require("ws");
const inquirer = require("inquirer");

let answers = null;
const nameOfPlayer = process.argv[4];
let symbolOfPlayer = "#";
let socket;
let moves = 0;
async function connect(address, port) {
  console.log(`Attempting to connect to ${address} at ${port}...`);

  socket = new webSocket(`ws://${address}:${port}`);

  socket.onopen = async function (ws) {
    console.log("Socket connected successfully");

    socket.on("message", (message) => {
      if (message.toString().split(" ")[0] == "symbolOfPlayer")
        symbolOfPlayer = message.toString().split(" ")[1];
      console.log(`\n ${message.toString()}`);
    });

    socket.send(`NAME ${nameOfPlayer.toString()}`);

    let playerOrSpectator = await inquirer.prompt({
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
  while (answers == null || moves <= 6) {
    answers = await inquirer.prompt({
      message: "What is your next move?",
      name: "Move",
      type: "input",
      default() {
        return "Enter a number 1- 9";
      },
    });
    moves++;
    socket.send(`${symbolOfPlayer} ${answers.Move}`);
  }

  socket.onclose = function (event) {
    console.log(event.code);
    process.exit();
  };

  socket.on("close", (message) => {
    console.log(`\n ${message.toString()}`);
  });
}

console.log("symbolOfPlayer", symbolOfPlayer);

connect(process.argv[2], process.argv[3]);
if (symbolOfPlayer == "X" || symbolOfPlayer == "O") {
  console.log("here");
}

nextMove();

const WebSocket = require("ws");
const inquirer = require("inquirer");

let answers = null;
let moves = [];

async function connect(address, port) {
  console.log(`Attempting to connect to ${address} at ${port}...`);
  socket = new WebSocket(`ws://${address}:${port}`);
  console.log(`Attempting success to ${address} at ${port}...`);
  socket.onopen = function (ws) {
    console.log("Socket connected successfully");
    setTimeout(() => {
      socket.send("TONY IS BACK");
    }, 0);
  };
  socket.on("message", function (message) {
    console.log("MESSAGE FROM HYDRA", message.toString());
  });
  askName();
}

async function askName() {
  while (answers != 10) {
    console.log("Moves till now", moves);
    answers = await inquirer.prompt({
      message: "What is your next move?",
      name: "Move",
      type: "input",
      default() {
        return "Enter a number 1- 9";
      },
    });
    moves.push(answers.Move);
    console.log("asnwer", answers);
    setTimeout(() => {
      socket.send(moves);
    }, 0);
  }
}

const arguments = process.argv.splice(2);
connect(arguments[0], arguments[1]);

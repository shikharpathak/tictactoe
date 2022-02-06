const WebSocket = require("ws");
const inquirer = require("inquirer");

let answers = null;
let moves = [];
let socket = null;

async function connect(address, port) {
  console.log(`Attempting to connect to ${address} at ${port}...`);
  socket = new WebSocket(`ws://${address}:${port}`);
  console.log(`Attempting success to ${address} at ${port}...`);
  let check;
  console.log("here");
  while (check != 10) {
    check++;
    console.log("there");
    check = await askName();
  }
}

async function askName() {
  console.log("Moves till now", answers);
  answers = await inquirer.prompt({
    message: "What is your next move?",
    name: "move",
    type: "input",
    default() {
      return "Enter a number 1- 9";
    },
  });

  socket.on("message", async function (message) {
    console.log("received: %s", message);
    arr.push(message);
    moves.push(answers);
  });
  return answers;
}

const arguments = process.argv.splice(2);
connect(arguments[0], arguments[1]);

const WebSocket = require("ws");
const inquirer = require("inquirer");

let answers = null;

async function connect(address, port) {
  console.log(`Attempting to connect to ${address} at ${port}...`);
  socket = new WebSocket(`ws://${address}:${port}`);
  console.log(`Attempting success to ${address} at ${port}...`);
  console.log("here");
  socket.onopen = function (ws) {
    console.log("Socket connected successfully");
    setTimeout(() => {
      socket.send("TONY IS BACK");
    }, 0);
  };
  setTimeout(() => {
    askName();
  }, 0);
}

async function askName() {
  while (answers != 10) {
    console.log("Moves till now", answers);
    socket.on("message", function (message) {
      console.log("MESSAGE FROM HYDRA", message.toString());
    });
    answers = await inquirer.prompt({
      message: "What is your next move?",
      name: "Move",
      type: "input",
      default() {
        return "Enter a number 1- 9";
      },
    });
    setTimeout(() => {
      socket.send("Move -> ", answers);
    }, 1000);
    console.log("asnwer", answers);
  }
}

const arguments = process.argv.splice(2);
connect(arguments[0], arguments[1]);

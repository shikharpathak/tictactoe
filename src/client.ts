const webSocket = require("ws");
const inquirer = require("inquirer");

let answers: { Move: any } | null = null;
const nameOfPlayer = process.argv[4];
let symbolOfPlayer = "#";
let socket: {
  onopen: (ws: any) => Promise<void>;
  on: (
    arg0: string,
    arg1: { (message: any): void; (message: any): void }
  ) => void;
  send: (arg0: string) => void;
  onclose: (event: any) => never;
};
let moves = 0;
async function connect(address: string, port: string) {
  console.log(`Attempting to connect to ${address} at ${port}...`);

  socket = new webSocket(`ws://${address}:${port}`);

  socket.onopen = async function (ws: any) {
    console.log("Socket connected successfully");

    socket.on("message", (message: { toString: () => string }) => {
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

  socket.onclose = function (event: { code: any }) {
    console.log(event.code);
    process.exit();
  };

  socket.on("close", (message: { toString: () => any }) => {
    console.log(`\n ${message.toString()}`);
  });
}

console.log("symbolOfPlayer", symbolOfPlayer);

connect(process.argv[2], process.argv[3]);
if (symbolOfPlayer == "X" || symbolOfPlayer == "O") {
  console.log("here");
}

nextMove();

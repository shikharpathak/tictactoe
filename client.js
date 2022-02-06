const WebSocket = require("ws");
const inquirer = require("inquirer");

function connect() {
  let address = "localhost";
  let port = "8080";

  console.log(`Attempting to connect to ${address} at ${port}...`);
  let socket = new WebSocket(`ws://${address}:${port}`);
  console.log(`Attempting success to ${address} at ${port}...`);

  let answers = null;
  let moves = [];
  async function askName() {
    answers = await inquirer.prompt({
      message: "What is your next move?",
      name: "move",
      type: "input",
      default() {
        return "Enter a number 1- 9";
      },
    });
    moves.push(answers);
    console.log("Moves till now", answers);
    socket.on("message", function (message) {
      console.log("received: %s", message);
      arr.push(message);
    });
  }

  askName();
}
connect();

// socket.on("connection", function (ws, req) {
//   ws.on("message", function (message) {
//     console.log("received: %s", message);
//     arr.push(message);
//     socket.clients.forEach(function each(client) {
//       client.send(message.toString());
//       console.log("Client.ID: " + client.id);
//     });
//   });
// });

// const arguments = process.argv.splice(2);
// connect(arguments[0], arguments[1]);

// socket.onmessage = function (event) {
//   console.log(`Message :: ${event.data}`);
// };

// socket.onclose = function (event) {
//   console.log(`Closed :: ${event.code} :: ${event.reason}`);
// };

// socket.onerror = function (error) {
//   console.log(`Error :: ${error.message}`);
// };
// socket.onopen = function (error) {
//   console.log(`Error :: HELLLO`);
// };
// socket.
// socket.onopen((error) => {
//   console.log(`Error :: ${error.message}`);
// });

// async function askName() {
//   const answers = await inquirer.prompt({
//     name: "player_name",
//     type: "input",
//     message: "What is your name?",
//     default() {
//       return "Player";
//     },
//   });
//   // playerName = answers.player_name;
// }
// askName();

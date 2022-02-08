"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const webSocket = require("ws");
const inquirer = require("inquirer");
let answers = null;
const nameOfPlayer = process.argv[4];
let symbolOfPlayer = "#";
let socket;
let moves = 0;
function connect(address, port) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Attempting to connect to ${address} at ${port}...`);
        socket = new webSocket(`ws://${address}:${port}`);
        socket.onopen = function (ws) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Socket connected successfully");
                socket.on("message", (message) => {
                    if (message.toString().split(" ")[0] == "symbolOfPlayer")
                        symbolOfPlayer = message.toString().split(" ")[1];
                    console.log(`\n ${message.toString()}`);
                });
                socket.send(`NAME ${nameOfPlayer.toString()}`);
                let playerOrSpectator = yield inquirer.prompt({
                    name: "Question",
                    type: "list",
                    message: "How would you like to join ?",
                    choices: ["Player", "Spectator"],
                    default() {
                        return "Your Choice";
                    },
                });
                socket.send(playerOrSpectator.Question);
            });
        };
    });
}
function nextMove() {
    return __awaiter(this, void 0, void 0, function* () {
        while (answers == null || moves <= 6) {
            answers = yield inquirer.prompt({
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
    });
}
console.log("symbolOfPlayer", symbolOfPlayer);
connect(process.argv[2], process.argv[3]);
if (symbolOfPlayer == "X" || symbolOfPlayer == "O") {
    console.log("here");
}
nextMove();

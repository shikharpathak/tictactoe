function assignStatus(messageFromClient, numberOfVisitors) {
  if (isStatusX(messageFromClient, numberOfVisitors) === "X") return "X";
  if (isStatusO(messageFromClient, numberOfVisitors) === "O") return "O";
  else {
    return { turn: "#", numberOfVisitors: numberOfVisitors };
  }
}

function isStatusX(messageFromClient, numberOfVisitors) {
  if (messageFromClient == "Player" && numberOfVisitors <= 1) {
    numberOfVisitors++;
    return { turn: "X", numberOfVisitors: numberOfVisitors };
  }
}

function isStatusO(messageFromClient, numberOfVisitors) {
  if (messageFromClient == "Player" && numberOfVisitors == 1) {
    numberOfVisitors++;
    return { turn: "O", numberOfVisitors: numberOfVisitors };
  }
}
module.exports = assignStatus;

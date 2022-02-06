function assignStatus(messageFromClient, numberOfVisitors) {
  if (isStatusX(messageFromClient, numberOfVisitors) === "X") return "X";
  if (isStatusO(messageFromClient, numberOfVisitors) === "O") return "O";
  else {
    return "#";
  }
}

function isStatusX(messageFromClient, numberOfVisitors) {
  if (messageFromClient == "Player" && numberOfVisitors <= 1) {
    numberOfVisitors++;
    return "X";
  }
}

function isStatusO(messageFromClient, numberOfVisitors) {
  if (messageFromClient == "Player" && numberOfVisitors == 1) {
    numberOfVisitors++;
    return "O";
  }
}
module.exports = assignStatus;

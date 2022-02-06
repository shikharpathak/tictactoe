function assignStatus(messageFromClient, numberOfVisitors) {
  if (messageFromClient == "Player" && numberOfVisitors <= 1) {
    numberOfVisitors++;
    clientMap.set("X", ws);
    reverseClientMap.set(ws, "X");
    return "X";
  } else if (messageFromClient == "Player" && numberOfVisitors == 1) {
    numberOfVisitors++;
    clientMap.set("O", ws);
    reverseClientMap.set(ws, "O");
    return "O";
  } else {
    clientMap.set("#", ws);
    reverseClientMap.set(ws, "#");
    return "#";
  }
}
module.exports = assignStatus;

function displayLogic(wss, value, grid, clientMap, reverseClientMap, turn) {
  value = Number(messageFromClient) - 1; // Value to mark sent by client in the form of 1-9
  grid[Math.floor(value / 3)][value % 3] = reverseClientMap.get(ws) ? "X" : "O";

  wss.clients.forEach(function each(client) {
    client.send(
      `\n\n\n${grid[0].join("   ")} \n\n\n${grid[1].join(
        "   "
      )} \n\n\n${grid[2].join("   ")} \n\n\n`
    );
  });
}
module.exports = displayLogic;

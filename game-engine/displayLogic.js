function displayLogic(wss, value, grid, messageFromClient, turn) {
  value = Number(messageFromClient) - 1; // Value to mark sent by client in the form of 1-9
  // grid[Math.floor(value / 3)][value % 3] = turn;
  grid[messageFromClient] = turn;

  wss.clients.forEach(function each(client) {
    client.send(
      `\n${grid[0]} | ${grid[1]} | ${grid[2]}
${grid[3]} | ${grid[4]} | ${grid[5]} 
${grid[6]} | ${grid[7]} | ${grid[8]} 
| |
      `
    );
    // client.send(
    //   `\n\n\n${grid[0].join("   ")} \n\n\n${grid[1].join(
    //     "   "
    //   )} \n\n\n${grid[2].join("   ")} \n\n\n`
    // );
  });
}
module.exports = displayLogic;

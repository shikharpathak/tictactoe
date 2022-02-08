module.exports = function displayGrid(wss: { clients: any[] }, grid: any[]) {
  wss.clients.forEach(function each(client: { send: (arg0: string) => void }) {
    client.send(
      `\n ${grid.slice(0, 3).join(" | ")} \n\n ${grid
        .slice(3, 6)
        .join(" | ")} \n\n ${grid.slice(6, 9).join(" | ")}  \n `
    );
  });
};

module.exports = function removeAllClients(sockets: { clients: any[] }) {
  sockets.clients.forEach(function (s) {
    s.close(1000, "Game has ended");
  });
};

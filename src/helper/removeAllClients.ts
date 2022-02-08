module.exports = function removeAllClients(sockets) {
  sockets.clients.forEach(function (s) {
    s.close(1000, "Game has ended");
  });
};

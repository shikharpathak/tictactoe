var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

const arr = [];
wss.on("connection", function (ws, req) {
  ws.on("message", function (message) {
    console.log("received: %s", message);
    arr.push(message);
    wss.clients.forEach(function each(client) {
      client.send(message.toString());
      console.log("Client.ID: " + client.id);
    });
  });
});

wss.on("listeners", function (ws) {
  ws.send("Hello World");
});

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8080 });

const arrMessage = [];

wss.on("connection", function (ws, req) {
  console.log("=============");
  ws.send("SERVER LIKES YOU");
  ws.on("message", function (message) {
    console.log(`Message from clients    : ${message}`);
    arrMessage.push(message);
    // TODO - The following piece broadcasts
    // wss.clients.forEach(function each(client) {
    //   client.send(message.toString());
    // });
  });
});

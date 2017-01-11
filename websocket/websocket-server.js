let port = 7000;

console.log('Starting WebSocket server on port 7000');

let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port: port });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    console.log('%s', message);
  });

});

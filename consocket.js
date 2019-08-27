var WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server;

module.exports = async function(server){
    var wss = new WebSocketServer({
        server
    })
    wss.on('connection', function (ws) {
        console.log('connection()');
        ws.on('message', function (message) {
            console.log(`Received: ${message}`);
            wss.clients.forEach(function(client){
                client.send(message);
            })
        })
    })
}
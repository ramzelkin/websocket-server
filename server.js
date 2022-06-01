const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port: 9000});

let currencies;

const request = require('request');

request('https://www.nbrb.by/api/exrates/rates?periodicity=0', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  console.log(res.json(JSON.parse(body)));
  currencies = body;
});

wsServer.on('connection', onConnect);
function onConnect(wsClient) {
  console.log('connect');
  // wsClient.send('Привет');
  wsClient.on('message', function(message) {
      if (message.type === "check") {
        console.log(currencies);

      }
      console.log(message);

      wsClient.send(currencies);
  });
  wsClient.on('close', function() {
      console.log('Пользователь отключился');
  });
}



 
    
const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    res.write(store);
    res.end();
  });
}

server.listen(3456, 'localhost', () => {
  console.log('Server listning on port 3456!');
});
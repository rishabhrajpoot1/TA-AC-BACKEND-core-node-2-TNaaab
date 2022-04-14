let http = require('http');
let fs = require('fs');
let url = require('url');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(5555, 'localhost', () => {
  console.log(`Server listning to port 5555!`);
});
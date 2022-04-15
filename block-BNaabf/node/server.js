const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');

// Path
// 1
// console.log(`../client/index.js`);
// 2
// console.log(path.join(__dirname, '..', 'client/index.js'));

// Server

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = ``;
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (req.method === `GET` && req.url === '/form') {
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    }

    if (req.method === `POST` && req.url === '/form') {
      var parsedData = JSON.parse(JSON.stringify(querystring.parse(store)));
      console.log(parsedData);
      res.setHeader('Content-Type', 'text/html');
      res.end(
        `<h2>${parsedData.name}</h2><h3>${parsedData.email}</h3><h4>${parsedData.age}</h4>`
      );
    }
  });
}

server.listen(1232, 'localhost', () => {
  console.log('Server listning to port 1212!');
});
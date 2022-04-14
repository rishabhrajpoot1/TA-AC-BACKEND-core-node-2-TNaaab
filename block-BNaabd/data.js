const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let dataType = req.headers['content-type'];
  let store = ``;
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (dataType === 'application/x-www-form-urlencoded') {
      let data = querystring.parse(store);
      res.write(JSON.stringify(data));
      res.end();
    } else if (dataType === 'application/json') {
      let data = JSON.parse(store);
      res.write(JSON.stringify(data));
      res.end();
    }
  });
}

server.listen(7000, 'localhost', () => {
  console.log('server listning to post 7000!');
});
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');

// Path Module
// console.log(__filename);
// console.log(__dirname + `/app.js`);
// console.log(`./index.html`);
// reqPath = path.join(__dirname, `/index.html`);
// console.log(reqPath);
// Create And Capture

let server1 = http.createServer(handleRequest1);

function handleRequest1(req, res) {
  let path = url.parse(req.url);
  pathname = path.pathname;
  let datatype = req.headers['content-type'];

  if (req.method === 'POST' && pathname === `/`) {
    let store = ``;
    req.on(`data`, (chunk) => {
      store += chunk;
    });

    req.on('end', () => {
      if (datatype === `application/json`) {
        let data = JSON.parse(store);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h2>${data.name}</h2><p>${data.email}</p>`);
      } 
    else if (datatype === `application/x-www-form-urlencoded`) {
        let data = qs.parse(store);
        res.statusCode = 201;
        res.end(JSON.stringify(data));
      }
    }
    );
  }
}

server1.listen(1111, 'localhost', () => {
  console.log('Server listning to port 1111!');
});
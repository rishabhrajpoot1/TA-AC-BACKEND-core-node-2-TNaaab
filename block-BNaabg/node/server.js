const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

let server = http.createServer(handleRequest);

let usersPath = __dirname + `/users/`;

function handleRequest(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let pathName = parsedUrl.pathname;
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if ((req.method === 'POST', pathName === '/users')) {
      var username = JSON.parse(store).username;
      fs.open(usersPath + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} registered successfully`);
          });
        });
      });
    }

    if (pathName === '/users' && req.method === 'GET') {
      var username = parsedUrl.query.username;
      fs.readFile(usersPath + username + '.json', (err, content) => {
        if (err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        return res.end(content);
      });
    }

    if (pathName === '/users' && req.method === 'PUT') {
      var username = parsedUrl.query.username;
      fs.open(usersPath + username + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} Updated Successfully`);
            });
          });
        });
      });
    }

    if (pathName === '/users' && req.method === 'DELETE') {
      var username = parsedUrl.query.username;
      fs.unlink(usersPath + username + '.json', (err) => {
        if (err) return console.log(err);
        return res.end(`${username} Deleted Successfully`);
      });
    }

    res.statusCode = 404;
    res.end('Page no found');
  });
}

server.listen(3000, 'localhost', () => {
  console.log('Server is listning on port 3000!');
});
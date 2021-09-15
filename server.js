"use strict";
const http = require('http');
const fs   = require('fs');
const path = require('path');

const staticServer = function(req, res) {
  var resolvedBase = path.resolve('./');
  var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
  var fileLoc = path.join(resolvedBase, safeSuffix);

  fs.readFile(fileLoc, function(err, data) {
    if (err) {
        console.log('failed to get file: ', fileLoc);
        res.writeHead(404, 'Not Found');
        res.write('404: File Not Found!');
        return res.end();
    }
    
    res.statusCode = 200;

    res.write(data);
    return res.end();
  });
};

http.createServer(staticServer).listen(5050);
console.warn('listening in port 5050');
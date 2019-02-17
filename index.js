const http = require('http');
const tr = require('tor-request');

const OPERATOR_URL = 'http://ac6075e49327b11e998ce02ec0690124-1813893234.us-east-1.elb.amazonaws.com/api'

//
// Create your proxy server and set the target in the options.
//

//
// Create your target server
//
http.createServer(function (req, res) {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    tr.torRequest.post(OPERATOR_URL,
      {
        headers: req.headers,
        body: body,
      }, function (err, tr_res, tr_body) {
      console.log(err, tr_body)
      res.writeHead(tr_res.statusCode, { 'Content-Type': 'application/json' });
      res.write(tr_body);
      res.end();
    });
  });

;
}).listen(8000);

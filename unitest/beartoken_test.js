const https = require('http');
const querystring = require('querystring');
const fs = require('fs');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var request; 
postData='grant_type=authorization_code&code=e6ee20166cceaadebda3e1b4a98527c64c9c26b3&state=xyz&redirect_uri=https://client.example.com/cb';
var error_handler = function(err) {
    console.log(err);
};
var resp = function(res) {
  console.log(res.statusCode);
  res.on('data',function(d) {
    console.log(d.toString());
  });
}
var digest = new Buffer( 'clientid:clientsecret');
console.log(digest.toString('base64'));
var request_setup = function(postData, response, error_handler) {
  var options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/oauth/securedata',
    method: 'POST',
    agent: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      'Authorization': 'Bearer c3639cff1bfe807e0b96f2bd0845e28bc24cf4d0',
      'Connection': 'close'
    }
  };
  request = https.request(options, response);
  request.on('error', error_handler);
}

var request_send  = function(postData) {
  request.write(postData);
  request.end();
  console.log("send data");
}
request_setup(postData, resp, error_handler);
request_send(postData);


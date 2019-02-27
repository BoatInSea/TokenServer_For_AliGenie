const https = require('http');
const querystring = require('querystring');
const fs = require('fs');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var request; 
postData='grant_type=authorization_code&code=cc0e4d0d89ba6d52d0f82be6c9d07efdea251c5f&state=xyz&redirect_uri=https://client.example.com/cb';
var error_handler = function(err) {
    console.log(err);
};
var resp = function(res) {
  console.log(res.statusCode);
  res.on('data',function(d) {
    console.log(d);
  });
}
var digest = new Buffer( 'clientid:clientsecret');
console.log(digest.toString('base64'));
var request_setup = function(postData, response, error_handler) {
  var options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/oauth/token',
    method: 'POST',
    agent: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      'Authorization': 'Basic '+digest.toString('base64'),
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
//module.exports.setup = request_setup;
//module.exports.send  = request_send;


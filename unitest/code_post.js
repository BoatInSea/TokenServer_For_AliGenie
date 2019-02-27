const https = require('https');
const querystring = require('querystring');
const fs = require('fs');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var request; 
postData='grant_type=authorization_code&code=72092c534c6bc698bfffce1dce9d5e096cbf7abd&state=xyz&client_secret=clentsecret&client_it=clientid&redirect_uri=https://client.example.com/cb';
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
    hostname: '144.34.148.188.16clouds.com',
    port: 443,
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


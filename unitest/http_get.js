const https = require('http');
const querystring = require('querystring');
const fs = require('fs');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var request; 
//pileCode=XXXXXXXXXXX&key=XXXXXX&msgtype=heartbeat&port=0&value=1
var request_setup = function(response, error_handler) {
  var options = {
    hostname: 'api.tf183.com',
    port: 80,
    path: '/index.php/api/Service/serviceJSON?pileCode=1234&key=94848&heartbeat=heartbeat&port=0&value=000000',
    method: 'GET',
    agent: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
//      'pileCode': '012345678',
//      'key': '012345678',
//      'msgtype': 'heartbeat',
//      'port': '0',
//      'value': '000000000000',
    }
  };
  request = https.request(options, response);
  request.on('error', error_handler);
}

var request_send  = function() {
  request.end();
}

module.exports.setup = request_setup;
module.exports.send  = request_send;


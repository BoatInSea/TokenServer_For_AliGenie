var express = require('express');
var Model = require('../models/model');
var mqtt    = require('mqtt');
const OAuthServer = require("express-oauth-server");
const model = new Model();
const oauth = new OAuthServer({ model: model });
var client  = mqtt.connect('mqtt://127.0.0.1');
var router = express.Router();
function loadCurrentUser(req) {
  return { id : '123', username: 'admin', password: '123456' };
}
function loadUser(req) {
  return model.loadUserByName(req.body.username || req.body.user);;
}
/* GET users listing. */
router.post('/authorize', oauth.authorize({
    authenticateHandler: {
    handle: loadUser }
    //handle: loadCurrentUser }
}));
//router.post('/authorize', oauth.authorize({
//    authenticateHandler: {
//    handle: loadCurrentUser }
//}));
router.post('/token', oauth.token());
router.use('/securedata', oauth.authenticate(), function(req, response, err){
   console.log(req.body);
   var discoverResp = {
  "header":{
      "namespace":"AliGenie.Iot.Device.Discovery",
      "name":"DiscoveryDevicesResponse",
      "messageId":"1bd5d003-31b9-476f-ad03-71d471922820",
      "payLoadVersion":1
   },
   "payload":{
      "devices":[{
      "deviceId":"x8fdkjfdkjjk",
      "deviceName":"light1",
      "deviceType":"light",
      "zone":"",          
      "brand":"",
      "model":"",     
      "icon":"https://git.cn-hangzhou.oss-cdn.aliyun-inc.com/uploads/aicloud/aicloud-proxy-service/41baa00903a71c97e3533cf4e19a88bb/image.png",
      "properties":[{
        "name":"color",
        "value":"Red"
       }],
      "actions":[
        "TurnOn",
        "TurnOff",
        "SetBrightness",       
        "AdjustBrightness",     
        "SetTemperature",
        "Query"        
     ],
      "extensions":{
         "extension1":"",
         "extension2":""
      }
     }]
   }
};
   var ret = {};
   response.writeHead(200, {"Content-Type": "application/json"});
   switch(req.body.header.namespace) {
      case "AliGenie.Iot.Device.Discovery":
   	discoverResp.header.messageId = req.body.header.messageId;
	ret = discoverResp;
        break;
      case "AliGenie.Iot.Device.Control":
   	discoverResp.header.messageId = req.body.header.messageId;
	ret = discoverResp;
	console.log(ret);
	//do mqtt pub
	if (req.body.payload.value == "on") {
	   //pub 000
	   client.publish('debug', '000');
	}
	if (req.body.payload.value == "off") {
	   //pub 111
	   client.publish('debug', '111');
	}
      break;
      default:
      break;
   }

   response.end(JSON.stringify(ret));
});

module.exports = router;

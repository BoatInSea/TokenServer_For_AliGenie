var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt:/127.0.0.1');
 
client.on('connect', function () {
    client.publish('debug', 'Hello mqtt');
    client.subscribe('debug');
});
client.on('message', function (topic, message) {
	console.log(message.toString());
	client.end();
});

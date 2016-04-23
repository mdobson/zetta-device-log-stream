# Zetta device log stream

Want user defined log messages streaming from your zetta device? Look no further!


This module will pusblish user logs down their own stream that you can enable or disable at your leisure.

## Usage

```javascript

var Device = require('zetta-device');
var util = require('util');
var createLogStream = require('zetta-device-log-stream');

var Led = module.exports = function() {
  Device.call(this);
}
util.inherits(Led, Device);

Led.prototype.init = function(config) {
  var self = this;
  config
    .type('led')
    .name('test-led')
    .state('off')
    .when('off', { allow: ['turn-on'] })
    .when('on', { allow: ['turn-off'] })
    .map('turn-on', function(cb) {
      self.state = 'on'; 
      self.warn('Turning on!');
      cb();
    })
    .map('turn-off', function(cb) {
      self.state = 'off';
      self.warn('Turning off!');
      cb();
    });
                    
    createLogStream(this, config);                                  
};
```

This stream will be added to your API response

```json
{
  title: "log-messages",
  rel: [
  "monitor",
  "http://rels.zettajs.io/object-stream"
  ],
  href: "ws://localhost:1337/servers/test/events?topic=led%2F380cb7a2-270a-4bba-8dc8-4ae39f366a53%2Flog-messages"
}
```

## Websocket format

This is the websocket format for your custom logs.

```json
{"topic":"led/380cb7a2-270a-4bba-8dc8-4ae39f366a53/log-messages","timestamp":1461420879643,"data":{"level":"warn","event":"test-led-log","message":"Turning on!"}}
```

## License

MIT



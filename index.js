module.exports = function createLogStream(device,  config) {
  config
    .stream('log-messages', function(stream) {
      ['log', 'info', 'warn', 'error'].forEach(function(level) {
        var orig = device[level];
        device[level] = function(message, data) {
          var obj = {
            level: level,
            event: (this.name || this.type || 'device') + '-log',
            message: message,
            data: data
          };

          stream.write(obj);
          orig.call(device, message, data);
        };
                
      });  
    });
}

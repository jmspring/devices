var nitrogen = require('nitrogen');

function TemperatureModelDevice(config) {
  nitrogen.Device.apply(this, arguments);
  this.config = config;
  
  if(!this.config) {
    this.config = {};
  }
  
  this.tags = ['sends:temperature'];
}

TemperatureModelDevice.prototype = Object.create(nitrogen.Device.prototype);
TemperatureModelDevice.prototype.constructor = TemperatureModelDevice;

TemperatureModelDevice.prototype.measure = function(callback) {
  var self = this;
  var messages = [
    new nitrogen.Message({
      type: 'temperature',
      body: {
          temperature: 98.6
      }
    })
  ];
  return callback(null, messages);
};

TemperatureModelDevice.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = TemperatureModelDevice;
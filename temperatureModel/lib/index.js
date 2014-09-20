var nitrogen = require('nitrogen');

function TemperatureModelDevice(config) {
  nitrogen.Device.apply(this, arguments);
  this.config = config;
  
  if(!this.config) {
    this.config = {};
  }
  
  this.tags = ['sends:temperature'];
}

TemeratureModelDevice = Object.create(nitrogen.Device.prototype);
TemeratureModelDevice.prototype.constructor = TemeratureModelDevice;

TemeratureModelDevice.prototype.measure = function(callback) {
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

TemeratureModelDevice.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = TemeratureModelDevice;
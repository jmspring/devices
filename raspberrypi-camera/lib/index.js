var spawn = require('child_process').spawn
  , nitrogen = require('nitrogen');

function RaspberryPiCamera(config) {
    nitrogen.Device.apply(this, arguments);
    this.tags = ['executes:cameraCommand', 'sends:image'];

    if (!config) config = {};

    this.config = config;

    this.config.width = this.config.width || 2592;
    this.config.height = this.config.height || 1944;
}

RaspberryPiCamera.prototype = Object.create(nitrogen.Device.prototype);
RaspberryPiCamera.prototype.constructor = RaspberryPiCamera;

RaspberryPiCamera.prototype.snapshot = function(options, callback) {
    options.width = options.width || this.config.width;
    options.height = options.height || this.config.height;

    var args = ['-t', 1, '-n', '-o', '-', '-w', options.width, '-h', options.height];

    if (this.config.rotate) {
        args.push('-rot');
        args.push(this.config.rotate);
    }

    var process = spawn('raspistill', args);

    return callback(process.stdout, options);
};

RaspberryPiCamera.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = RaspberryPiCamera;
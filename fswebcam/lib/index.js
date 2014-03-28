var spawn = require('child_process').spawn
  , nitrogen = require('nitrogen');

function FSWebCamCamera(config) {
    nitrogen.Device.apply(this, arguments);
    this.capabilities = ['cameraCommand'];

    if (!config) config = {};

    this.config = config;

    this.config.width = this.config.width || 640;
    this.config.height = this.config.height || 480;
}

FSWebCamCamera.prototype = Object.create(nitrogen.Device.prototype);
FSWebCamCamera.prototype.constructor = FSWebCamCamera;

FSWebCamCamera.prototype.snapshot = function(options, callback) {
    options.path = options.path || new Date().getTime() + ".jpg";
    options.width = options.width || this.config.width;
    options.height = options.height || this.config.height;

    var process = spawn('fswebcam', ['-r', this.config.width + 'x' + this.config.height, '--no-banner', '--no-timestamp', '--jpeg', '85', '-D', '2', '-']);
    
    return callback(process.stdout, options);
};

FSWebCamCamera.prototype.status = function(callback) {
    callback(false, {});
};

module.exports = FSWebCamCamera;

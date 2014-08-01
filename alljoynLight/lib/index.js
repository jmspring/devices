var alljoyn = require('alljoyn')
  , nitrogen = require('nitrogen');

function AllJoynLight(config) {
    nitrogen.Device.apply(this, arguments);

    this.tags = ['executes:lightCommand', 'sends:lightState'];

    if (!config) config = {};

    this.config = config;
}

AllJoynLight.prototype = Object.create(nitrogen.Device.prototype);
AllJoynLight.prototype.constructor = AllJoynLight;

AllJoynLight.prototype.init = function(callback) {
    this.bus = alljoyn.BusAttachment('n2');
    this.interface = alljoyn.InterfaceDescription();
    this.listener = alljoyn.BusListener(
        function(name){
            console.log("FoundAdvertisedName", name);

            // join session, sessionId is used to send messages.
            this.sessionId = this.bus.joinSession(name, portNumber, 0);

            // send a signal message
            object.signal(null, sessionId, interface, "Chat", "Hello, I am a client!");
        },
        function(name) {
            console.log("LostAdvertisedName", name);
        },
        function(name){
            console.log("NameOwnerChanged", name);
        }
    );

    // create the interface
    this.bus.createInterface('org.alljoyn.sample.ledcontroller', interface);

    // add a signal to the interface, specifying what kind of message we will accept
    // s = string, d = number, b = boolean
    this.interface.addSignal("Flash", "d", "frequency");
    this.interface.addSignal("On", "d", "level");
    this.interface.addSignal("Off", null, null);

    // register the listener on the bus
    this.bus.registerBusListener(listener);

    // initialize the bus
    this.bus.start();

    // create the BusObject that will send and receive messages
    this.busObject = alljoyn.BusObject("/lightService");

    bus.registerBusObject(this.busObject);

    bus.connect();

    // discover devices with prefix 'org.alljoyn'
    bus.findAdvertisedName('org.alljoyn.sample.ledcontroller.' + this.device.nickname);

    // create a SessionPortListener for session changes
    var portListener = alljoyn.SessionPortListener(
        function(port, joiner) {
            console.log("AcceptSessionJoiner", port, joiner);

            // return true to accept the new session member
            return true;
        },
        function(port, sessId, joiner) {
            sessionId = sessId;
            console.log("SessionJoined", port, sessionId, joiner);
        }
    );

    this.options = {};
};

AllJoynLight.prototype.set = function(options, callback) {
    if (options.brightness !== 0.0)
        chatObject.signal(null, sessionId, inter, "On", options.brightness);
    else
        chatObject.signal(null, sessionId, inter, "Off", options.brightness);

    if (options.frequency)
        chatObject.signal(null, sessionId, inter, "Flash", options.frequency);

    for (var key in Object.keys(options)) {
        this.options[key] = options[key];
    }
};

AllJoynLight.prototype.status = function(callback) {
    return callback(false, this.options);
};

module.exports = AllJoynLight;
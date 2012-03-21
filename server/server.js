// Set up collections
var collections = ['users'];

// Save clients by user id
var clients = {};

// Basic requirements
var sio   = require('socket.io').listen(8000),
	db    = require('mongojs').connect('Chihiro', collections),
	redis = require('redis').createClient();

// Basic configuration
sio.configure(function () {
    // sio.set('log level', 1);
});

// When starting up, initialise redis
// TODO: load recent users


// The server program
sio.sockets.on('connection', function (socket) {
    // Interfaces related to users
    var user = require('./user').init(db, redis, clients, socket);
    socket.on('init',  user.init);
    socket.on('login', user.authenticate);
    socket.on('logout', user.logout);
    socket.on('disconnect', user.disconnect);
    socket.on('signup', user.signup);
    socket.on('find closest', user.findClosest);
    socket.on('update location', user.updateLocation);
    socket.on('update profile', user.updateProfile);
});

function listen(port) {
    // Set up collections
    var collections = ['users'];

    // Basic requirements
    var sio   = require('socket.io').listen(port),
    	db    = require('mongojs').connect('Chihiro', collections),
    	redis = require('redis').createClient();

    // Save clients by user id
    var clients = {};

    // Basic configuration
    sio.configure(function () {
        //sio.set('log level', 1);
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
        socket.on('find by interests', user.findByInterests);
        socket.on('update location', user.updateLocation);
        socket.on('update profile', user.updateProfile);
        socket.on('get info by id', user.getInfoById);
        socket.on('get info by email', user.getInfoByEmail);
        socket.on('get info by phone', user.getInfoByPhone);
        socket.on('send friend request', user.sendFriendRequest);
        socket.on('add friend', user.addFriend);
        socket.on('remove friend', user.removeFriend);
	socket.on('send message', message.sendMessage);
    });
}

exports.listen = listen;

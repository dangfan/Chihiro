function listen(port) {
    // Set up collections
    var collections = ['users', 'activities'];

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
        var user = require('./user').init(db, redis, clients);
        var message = require('./message').init(redis, clients);
        var activity = require('./activity').init(db, redis, clients);
        socket.on('init',  user.init);
        socket.on('login', user.authenticate);
        socket.on('logout', user.logout);
        socket.on('disconnect', user.disconnect);
        socket.on('signup', user.signup);
        socket.on('find closest', user.findClosest);
        socket.on('find by interests', user.findByInterests);
        socket.on('find by phones', user.findByPhones);
        socket.on('update location', user.updateLocation);
        socket.on('update profile', user.updateProfile);
        socket.on('get info by id', user.getInfoById);
        socket.on('get info by email', user.getInfoByEmail);
        socket.on('get info by phone', user.getInfoByPhone);
        socket.on('send friend request', user.sendFriendRequest);
        socket.on('add friend', user.addFriend);
        socket.on('remove friend', user.removeFriend);
        socket.on('update portrait', user.updatePortrait);
        socket.on('send message', message.sendMessage);
        socket.on('create topic', message.createTopic);
        socket.on('get topic info', message.getTopicInfo);
        socket.on('subscribe topic', message.subscribeTopic);
        socket.on('send topic message', message.sendTopicMessage);
        socket.on('add activity', activity.addActivity);
        socket.on('get activity', activity.getActivityById);
    });
}

exports.listen = listen;

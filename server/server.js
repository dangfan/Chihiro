// Set up collections
var collections = ['users'];

// Basic requirements
var sio   = require('socket.io').listen(8000),
	db    = require('mongojs').connect('Chihiro', collections),
	md5   = require('MD5'),
	uuid  = require('node-uuid'),
	redis = require('redis').createClient();

// Save clients by user id
var clients = {};

// Salt
var salt = 'Ch!hlr0:';

// When starting up, initialise redis
// TODO: load recent users

// The server program
sio.sockets.on('connection', function (socket) {

    // Login the specific user with the current socket connection
    function login(usr, callback) {
        // Generate uuid as session id
        var sid = uuid.v4();
        // Bind session, user and socket
        socket.set('sid', sid);
        clients[usr._id] = socket;
        // Save in redis
        redis.set('sid:' + sid, usr._id);
        redis.hmset('users:' + usr._id,
            'email', usr.email,
            'phone', usr.phone,
            'password', usr.password);
        // TODO: save other things
        callback(sid);
        // TODO: check offline messages
    }


    // The initial message after client connected
    // Let the user be online and save its socket
    socket.on('init', function (sid, callback) {
        // Bind this socket with the particular sid
        socket.set('sid', sid);
        redis.get('sid:' + sid, function (err, usrId) {
            if (usrId) {
                clients[usrId] = socket;
                callback('ok');
                // TODO: check offline messages
            } else {
                callback('error');
            }
        });
    });


    // If the user disconnects, we remove it from clients
    socket.on('disconnect', function () {
        socket.get('sid', function (err, sid) {
            redis.get('sid:' + sid, function (err, usrId) {
                delete clients[usrId];
            });
        });
    });


	// Use username(email or phone number) to log in
	// After logged, the session id is generated
	// and saved in redis
    socket.on('login', function (data, callback) {
    	var pass = md5(salt + data.password),
    		usr = data.username.indexOf('@') > 0
    				? { email: data.username, password: pass }
    				: { phone: data.username, password: pass };
        // TODO: check redis cache first
    	db.users.findOne(usr, function (err, usr) {
    		if (!usr) {
    			callback('error');
    		} else {
                login(usr, callback);
    		}
    	});
    });


    // If the user want to log out, delete session id
    socket.on('logout', function () {
        socket.get('sid', function (err, sid) {
            var key = 'sid:' + sid;
            redis.get(key, function (err, usrId) {
                delete clients[usrId];
                redis.del(key);
            });
        });
    });


    // Provide email, phone number and password to
    // create a new account
    socket.on('signup', function (data, callback) {
    	db.users.insert({
    		'email':    data.email,
    		'password': md5(salt + data.password),
    		'phone':    data.phone
    	}, {
            safe: true      // Check if insert is successful
        }, function (err, objects) {
            if (err) {
                if (err.message.indexOf('email') != -1) {
                    callback('email duplicated');
                } else {
                    callback('phone duplicated');
                }
            } else {
                login(objects[0], callback);
            }
        });
    });


    // Update user's profile
    socket.on('update profile', function (data) {
    	redis.get('sid:' + data.sid, function (err, usrId) {
            // Do updating
        });
    });


    // Update user's location
    socket.on('update location', function (data) {
        socket.get('sid', function (err, sid) {
            redis.get('sid:' + sid, function (err, usrId) {
                db.users.update({'_id': db.ObjectId(usrId)},
                    {$set: {location: [data.longitude, data.latitude]}});
                redis.set('location:' + usrId,
                    '[' + data.longitude + ',' + data.latitude + ']');
            });
        });
    });


    // Find closest people
    socket.on('find closest', function (callback) {
        socket.get('sid', function (err, sid) {
            if (!sid) return;
            redis.get('sid:' + sid, function (err, usrId) {
                redis.get('location:' + usrId, function (err, location) {
                    db.executeDbCommand({
                        geoNear:            'users',
                        near:               eval(location),
                        spherical:          true,
                        maxDistance:        1 / 6371,       // 1km
                        distanceMultiplier: 6371000
                    }, function (err, obj) {
                        var data = new Array();
                        obj.documents[0].results.forEach(function (result) {
                            if (result.obj._id == usrId) return;
                            data.push({
                                dis:      result.dis,
                                id:       result.obj._id
                                // TODO: add more information
                            });
                        });
                        callback(data);
                    });
                });
            });
        });
    });
});

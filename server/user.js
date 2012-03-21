var md5  = require('MD5'),
    uuid = require('node-uuid');

var salt = 'Ch!hlr0:',
    db,
    redis,
    clients,
    socket;

exports.init = function(_db, _redis, _clients, _socket) {
    db      = _db;
    redis   = _redis;
    clients = _clients;
    socket  = _socket;
    return {
        init:           init,
        authenticate:   authenticate,
        logout:         logout,
        disconnect:     disconnect,
        signup:         signup,
        updateLocation: updateLocation,
        updateProfile:  updateProfile,
        findClosest:    findClosest
    };
}

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

// After the app starting up,
// init needs to be called first if the app has session id
function init(sid, callback) {
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
}

// Authenticate a user by its username and password
function authenticate(data, callback) {
    var pass = md5(salt + data.password),
        usr = data.username.indexOf('@') > 0
                ? { email: data.username, password: pass }
                : { phone: data.username, password: pass };
    // TODO: check redis cache first
    db.users.findOne(usr, function (err, usr) {
        if (!usr) {
            callback('error');
        } else {
            login(usr, callback, socket);
        }
    });
};

// Log out manully
function logout() {
    socket.get('sid', function (err, sid) {
        var key = 'sid:' + sid;
        redis.get(key, function (err, usrId) {
            delete clients[usrId];
            redis.del(key);
        });
    });
}

// After disconnecting, remove the user from clients list
function disconnect() {
    socket.get('sid', function (err, sid) {
        redis.get('sid:' + sid, function (err, usrId) {
            delete clients[usrId];
        });
    });
}

// Provide email, phone number and password to
// create a new account
function signup(data, callback) {
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
}

// Find closest people around the user
function findClosest(callback) {
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
}

function updateLocation(data) {
    socket.get('sid', function (err, sid) {
        redis.get('sid:' + sid, function (err, usrId) {
            db.users.update({'_id': db.ObjectId(usrId)},
                {$set: {location: [data.longitude, data.latitude]}});
            redis.set('location:' + usrId,
                '[' + data.longitude + ',' + data.latitude + ']');
        });
    });
}

function updateProfile(data) {
    socket.get('sid', function (err, sid) {
        redis.get('sid:' + sid, function (err, usrId) {
            // TODO: update
        });
    });
}
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
        findClosest:    findClosest,
        getInfoById:    getInfoById,
        getInfoByEmail: getInfoByEmail,
        getInfoByPhone: getInfoByPhone
    };
}

// Login the specific user with the current socket connection
function login(uid, usr, callback) {
    // Generate uuid as session id
    var sid = uuid.v4();
    // Bind session, user and socket
    socket.set('sid', sid);
    clients[uid] = socket;
    // Save in redis
    redis.set('sid:' + sid, uid);
    redis.hmset('users:' + uid,
        'email', usr.email,
        'phone', usr.phone,
        'password', usr.password);
    redis.set('emails:' + usr.email, uid);
    redis.set('phones:' + usr.phone, uid);
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
    var pass = md5(salt + data.password);
    var cond; // MongoDB find condition
    if (data.username.indexOf('@') > 0) { // use email
        redis.get('emails:' + data.username, function (err, usrId) {
            if (!usrId) {
                cond = { email: data.username, password: pass };
                return;
            } else {
                redis.hgetall('users:' + usrId, function (err, usr) {
                    if (usr.email == data.username && user.password == pass) {
                        login(usrId, usr, callback);
                    } else {
                        callback('error');
                    }
                })
            }
        });
    } else {     // use phone number
        redis.get('phones:' + data.username, function (err, usrId) {
            if (!usrId) {
                cond = { phone: data.username, password: pass };
                return;
            } else {
                redis.hgetall('users:' + usrId, function (err, usr) {
                    if (usr.phone == data.username && user.password == pass) {
                        login(usrId, usr, callback);
                    } else {
                        callback('error');
                    }
                })
            }
        });
    }
    db.users.findOne(cond, function (err, usr) {
        if (!usr) {
            callback('error');
        } else {
            login(usr._id, usr, callback);
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
            login(objects[0]._id, objects[0], callback);
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
        if (!sid) return;
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
        if (!sid) return;
        redis.get('sid:' + sid, function (err, usrId) {
            // TODO: update
        });
    });
}

// Get basic information of a user by id
function getInfoById(usrId, callback) {
    socket.get('sid', function (err, sid) {
        if (!sid) return;
        // Get from redis first
        redis.hgetall('users:' + usrId, function (err, usr) {
            if (!usr) {
                db.users.find({_id: db.ObjectId(usrId)},
                    function (err, usr) { processUser(usr); });
            } else {
                processUser(usr);
            }
        });
    });
}

// Get basic information of a user by email
function getInfoByEmail(email, callback) {
    socket.get('sid', function (err, sid) {
        if (!sid) return;
        // Get from redis first
        redis.get('emails:' + email, function (err, usrId) {
            if (!usrId) {
                db.users.findOne({email: email},
                    function (err, usr) { processUser(usr, callback); });
            } else {
                getInfoById(usrId, callback);
            }
        });
    });
}

// Get basic information of a user by phone number
function getInfoByPhone(phone, callback) {
    socket.get('sid', function (err, sid) {
        if (!sid) return;
        // Get from redis first
        redis.get('phones:' + phone, function (err, usrId) {
            if (!usrId) {
                db.users.findOne({phone: phone},
                    function (err, usr) { processUser(usr, callback); });
            } else {
                getInfoById(usrId, callback);
            }
        });
    });
}

// Remove unnecessary attributes and callback
function processUser(usr, callback) {
    if (usr) {
        delete usr['password'];
        // TODO: delete more things
        callback(usr);
    } else {
        callback('not found');
    }
}
var md5  = require('MD5'),
    uuid = require('node-uuid');

var salt = 'Ch!hlr0:',
    db,
    redis,
    clients,
    socket;

exports.init = function(_db, _redis, _clients, _socket) {
    db       = _db;
    redis    = _redis;
    clients  = _clients;
    socket   = _socket;
    return {
        init:               init,
        authenticate:       authenticate,
        logout:             logout,
        disconnect:         disconnect,
        signup:             signup,
        updateLocation:     updateLocation,
        updateProfile:      updateProfile,
        findClosest:        findClosest,
        getInfoById:        getInfoById,
        getInfoByEmail:     getInfoByEmail,
        getInfoByPhone:     getInfoByPhone,
        sendFriendRequest:  sendFriendRequest,
        addFriend:          addFriend,
        removeFriend:       removeFriend
    };
}

function loadMessages() {
    // Topics
    redis.on('message', function (channel, msg) {
        var info = channel.split(':'),
            data = eval(msg);
        redis.hget('users:' + data.uid, 'nickname', function (err, nickname) {
            data.nickname = nickname;
            data.tid = info[1];
            socket.emit(info[0], data);
        });
    });
}

// Login the specific user with the current socket connection
function login(usr, callback) {
    // Generate uuid as session id
    var sid = uuid.v4();
    // Bind user and socket
    socket.set('uid', usr._id.toString());
    clients[usr._id] = socket;
    // Save in redis
    redis.set('sid:' + sid, usr._id);
    // delete usr['null'];
    if (!usr.friends) {
        redis.smembers('friends:' + usr._id, function (err, obj) {
            usr.friends = obj;
            next();
        });
    } else {
        next();
    }
    function next() {
        var tmp = usr.friends;
        var length = tmp.length;
        usr.friends = new Array();
        for (var uid in tmp) {
            uid = tmp[uid];
            redis.hgetall('users:' + uid, function (err, u) {
                if (!('_id' in u)) {
                    db.users.findOne({_id: db.ObjectId(uid)},
                        function (err, u) {
                            processUser(u, function(t) {
                                usr.friends.push(t.obj);
                                if (!--length) finish();
                            });
                        });
                } else {
                    processUser(u, function (t) {
                        usr.friends.push(t.obj);
                        if (!--length) finish();
                    });
                }
            });
        }
        if (!length) finish();
        function finish() {
            callback({err: 0, sid: sid, obj: usr});
            // Load offline messages
            loadMessages();
            console.log('user ' + usr._id + ' is now online.');
        }
    }
}

// After the app starting up,
// init needs to be called first if the app has session id
function init(sid, callback) {
    redis.get('sid:' + sid, function (err, uid) {
        if (uid) {
            redis.hgetall('users:' + uid, function (err, usr) {
                if (usr) {
                    login(usr, callback);
                } else {
                    callback({err: 1, msg: 'Please login'});
                }
            });
        } else {
            callback({err: 1, msg: 'Please login'});
        }
    });
}

// Authenticate a user by its username and password
function authenticate(data, callback) {
    if (!data.username || !data.password) return;
    var pass = md5(salt + data.password);
    if (data.username.indexOf('@') > 0) { // use email
        redis.get('emails:' + data.username, function (err, uid) {
            if (!uid) {
                findInDB({ email: data.username, password: pass });
            } else {
                redis.hgetall('users:' + uid, function (err, usr) {
                    if (usr.email == data.username && usr.password == pass) {
                        login(usr, callback);
                    } else {
                        callback({err: 1, msg: '请检查用户名或密码'});
                    }
                });
            }
        });
    } else {     // use phone number
        redis.get('phones:' + data.username, function (err, uid) {
            if (!uid) {
                findInDB({ phone: data.username, password: pass });
            } else {
                redis.hgetall('users:' + uid, function (err, usr) {
                    if (usr.phone == data.username && usr.password == pass) {
                        login(usr, callback);
                    } else {
                        callback({err: 1, msg: '请检查用户名或密码'});
                    }
                });
            }
        });
    }
    function findInDB(cond) {
        db.users.findOne(cond, function (err, usr) {
            if (!usr) {
                callback({err: 1, msg: '请检查用户名或密码'});
            } else {
                login(usr, callback);
            }
        });
    }
};

function cleanAfterDisconnect(uid) {
    delete clients[uid];
    db.users.update({_id: db.ObjectId(uid)}, 
        {$set: {location: [0, -90]}});

    console.log('user ' + uid + ' is now offline.');
}

// Log out manully
function logout(sid) {
    socket.get('uid', function (err, uid) {
        var key = 'sid:' + sid;
        cleanAfterDisconnect(uid);
        redis.del(key);
    });
}

// After disconnecting, remove the user from clients list
function disconnect() {
    socket.get('uid', function (err, uid) {
        cleanAfterDisconnect(uid);
    });
}

// Provide email, phone number and password to
// create a new account
function signup(data, callback) {
    if (!data.email || !data.password || !data.phone || !data.nickname) return;
    db.users.insert({
        email:    data.email,
        password: md5(salt + data.password),
        phone:    data.phone,
        nickname: data.nickname
    }, {
        safe: true      // Check if insert is successful
    }, function (err, objects) {
        if (err) {
            if (err.message.indexOf('email') != -1) {
                callback({err: 1, msg: '该邮箱已被使用，请重试'});
            } else {
                callback({err: 1, msg: '该手机号已被使用，请重试'});
            }
        } else {
            var usr = objects[0];
            redis.set('emails:' + usr.email, usr._id);
            redis.set('phones:' + usr.phone, usr._id);
            setUserData(usr);

            console.log('new user ' + usr.nickname + ' is signed up.');

            login(usr, callback);
        }
    });
}

// Find closest people around the user
function findClosest(callback) {
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.get('location:' + uid, function (err, location) {
            db.executeDbCommand({
                geoNear:            'users',
                near:               eval(location),
                spherical:          true,
                maxDistance:        1 / 6371,       // 1km
                distanceMultiplier: 6371000
            }, function (err, obj) {
                var data = new Array();
                obj.documents[0].results.forEach(function (result) {
                    if (result.obj._id == uid) return;
                    var obj = result.obj;
                    obj.dis = result.dis;
                    delete obj.password;
                    delete obj.email;
                    delete obj.phone;
                    delete obj.friends;
                    delete obj['null'];
                    data.push(obj);
                });
                callback(data);

                console.log('user ' + uid + ' found closest people.');
            });
        });
    });
}


// Find nearby users by interests
function findByInterests(callback) {
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.get('location:' + uid, function (err, location) {
            db.executeDbCommand({
                geoNear:            'users',
                near:               eval(location),
                spherical:          true,
                maxDistance:        1 / 6371,       // 1km
                distanceMultiplier: 6371000
            }, function (err, obj) {
                var data = new Array();
                obj.documents[0].results.forEach(function (result) {
                    if (result.obj._id == uid) return;
                    var obj = result.obj;
                    obj.dis = result.dis;
                    delete obj.password;
                    delete obj.email;
                    delete obj.phone;
                    delete obj.friends;
                    delete obj['null'];
                    data.push(obj);
                });
                callback(data);

                console.log('user ' + uid + ' found closest people.');
            });
        });
    });
}

function updateLocation(data) {
    socket.get('uid', function (err, uid) {
    if (!uid) return;
        db.users.update({'_id': db.ObjectId(uid)},
            {$set: {location: [data.longitude, data.latitude]}});
        redis.set('location:' + uid,
            '[' + data.longitude + ',' + data.latitude + ']');

        console.log('user ' + uid + ' updated its location.');
    });
}

function updateProfile(data) {
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        // set in mongo
        db.users.update({'_id': db.ObjectId(uid)}, {$set: data});
        // set in redis
        data._id = uid;
        setUserData(data);
        
        console.log('user ' + uid + ' updated its profile.');
    });
}

// Get basic information of a user by id
function getInfoById(uid, callback) {
    socket.get('uid', function (err, t) {
        if (!t) return;
        // Get from redis first
        redis.hgetall('users:' + uid, function (err, usr) {
            if (!usr) {
                db.users.find({_id: db.ObjectId(uid)},
                    function (err, usr) { processUser(usr, callback); });
            } else {
                processUser(usr, callback);
            }
        });
    });
}

// Get basic information of a user by email
function getInfoByEmail(email, callback) {
    socket.get('uid', function (err, t) {
        if (!t) return;
        // Get from redis first
        redis.get('emails:' + email, function (err, uid) {
            if (!uid) {
                db.users.findOne({email: email},
                    function (err, usr) { processUser(usr, callback); });
            } else {
                getInfoById(uid, callback);
            }
        });
    });
}

// Get basic information of a user by phone number
function getInfoByPhone(phone, callback) {
    socket.get('uid', function  (err, t) {
        if (!t) return;
        // Get from redis first
        redis.get('phones:' + phone, function (err, uid) {
            if (!uid) {
                db.users.findOne({phone: phone},
                    function (err, usr) { processUser(usr, callback); });
            } else {
                getInfoById(uid, callback);
            }
        });
    });
}

// Remove unnecessary attributes and callback
function processUser(usr, callback) {
    if (usr) {
        delete usr.password;
        delete usr.email;
        delete usr.phone;
        delete usr['null'];
        delete usr.friends;
        callback({err: 0, obj: usr});
    } else {
        callback({err: 1, msg: '未找到用户'});
    }
}

function setUserData(usr) {
    for (key in usr) {
        if (key == 'interests') {
            redis.hset('users:' + usr._id, key, JSON.stringify(usr[key]));
        } else if (key == 'friends') { 
        } else {
            redis.hset('users:' + usr._id, key, usr[key]);
        }
    }
}


// send a request to another user
function sendFriendRequest(desUsrId) {
    socket.get('uid', function (err, uid) {
        redis.sadd('friendRequests:' + desUsrId, uid);
        emitFriendRequests(desUsrId);
    });
}

function emitFriendRequests(uid) {
    queue = new Array();
    while (true) {
        redis.spop('friendRequests:' + uid, function (err, iuid) {
            if (!iuid) {
                redis.sadd('friendRequests:' + uid, queue);
                return;
            }
            getInfoById(iuid, function (obj) {
                if (uid in clients) {
                    clients[uid].emit('friend request', obj);
                } else  {
                    queue.push(iuid);
                }
            });
        });
    }
}

// accept a friend request
function addFriend(desUsrId) {
    socket.get('uid', function (err, uid) {
        redis.sadd('friends:' + uid, desUsrId);
        db.users.update({'_id': db.ObjectId(uid)},
            {$addToSet: {friends: desUsrId}});
    });
}

// remove a friend
function removeFriend(desUsrId) {
    socket.get('uid', function (err, uid) {
        redis.srem('friends:' + uid, desUsrId);
        db.users.update({'_id': db.ObjectId(uid)},
            {$pull: {friends: desUsrId}});
    });
}
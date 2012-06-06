var db,
    redis,
    clients,
    socket;
    
exports.init = function(_db, _redis, _clients, _socket) {
    db       = _db;
    redis    = _redis;
    clients  = _clients;
    socket   = _socket;
    return {
        addActivity:                addActivity,
        removeActivity:             removeActivity,
        updateActivityDetails:      updateActivityDetails,
        participateActivity:        participateActivity,
        unparticipateActivity:      unparticipateActivity,
        getParticipants:            getParticipants,
        getActivityById:            getActivityById,
        findActivityByCreator:      findActivityByCreator,
        findActivityByParticipant:  findActivityByParticipant,
        findActivityByLocation:     findActivityByLocation,
        addParticipants:            addParticipants
    };
}

function addActivity(activity, callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        activity.creator_id = uid;
        // set in mongo
        db.activities.insert(activity, {
            safe: true      // Check if insert is successful
        }, function (err, objects) {
            if (err) {
                callback({err: 1, msg: '添加活动失败'});
            } else {
                // set in redis
                var activity = objects[0];
                for (key in activity)
                    redis.hset('activities:' + activity._id, key, activity[key]);
                console.log('activity created:' + activity._id + '|' + activity.name + '|' + uid);
                redis.set('activity_location:' + activity._id,
                    '[' + activity.mark.longitude + ',' + activity.mark.latitude + ']');
                redis.sadd('activities_createdby:' + uid, activity._id);
                redis.sadd('activity_participants:' + activity._id, uid);
                redis.sadd('activities_participate:' + uid, activity._id);

                // tell nearest users
                redis.get('activity_location:' + activity._id, function (err, location) {
                    db.executeDbCommand({
                        geoNear:            'users',
                        near:               eval(location),
                        spherical:          true,
                        maxDistance:        1000 / 6371,
                        distanceMultiplier: 6371000
                    }, function (err, obj) {
                        var data = new Array();
                        obj.documents[0].results.forEach(function (result) {
                            var obj = result.obj;
                            if (obj._id in clients) {
                                clients[obj._id].emit('recommend activity', activity);
                                console.log('recommend activity to ' + obj._id);
                            }
                        });
                    });
                });

                // callback
                console.log('user ' + uid + 'add a new activity');
                callback({err: 0, msg: '添加活动成功'});
            }
        });
    });
}

function removeActivity(activityid, callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        // find in redis
        redis.hgetall('activities:' + activityid, function (err, activity) {
            if (!activity) {
                // find in mongo
                // delete in mongo
                // callback
            } else {
                // delete in redis
                redis.del('activities:' + activityid);
                // find in mongo
                // delete in mongo
                // callback
            }
        });
    });
}

function updateActivityDetails(activity, callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.hget('activities:' + activity._id, 'creator_id', function(err, cid) {
            if (uid != cid) return;
            // set in mongo
            db.activities.update({'_id': db.ObjectId(activity._id)}, {$set: activity});
            // set in redis
            for (key in activity)
                redis.hset('activities:' + activity._id, key, activity[key]);
            callback({err: 0, msg: ''});
        });
    });
}

function addParticipants(data, callback) {
    console.log(data);
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) {
            callback({err: 1, msg: 'please log in'});
            return;
        }
        if (!data.aid || !data.ids) {
            callback({err: 1, msg: 'please provide complete info'});
            return;
        }
        for (var i = 0; i != data.ids.length; ++i) {
            redis.sadd('activity_participants:' + data.aid, data.ids[i]);
            redis.sadd('activities_participate:' + data.ids[i], data.aid);
            callback({err: 0, msg: ''});
        }
    });
}

function participateActivity(activityid, callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) callback({err: 1, msg: ''});
        redis.sadd('activity_participants:' + activityid, uid);
        redis.sadd('activities_participate:' + uid, activityid);
        console.log('activity participate:' + activityid + '|' + uid);
        callback({err: 0, msg: ''});
    });
}

function unparticipateActivity(activityid, callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) callback({err: 1, msg: ''});
        redis.srem('activity_participants:' + activityid, uid);
        redis.srem('activities_participate:' + uid, activityid);
        console.log('activity unparticipate:' + activityid + '|' + uid);
        callback({err: 0, msg: ''});
    });
}

function getParticipants(activityid, callback) {
    redis.smembers('activity_participants:' + activityid, function (err, data) {
        if (err) callback({});
        var objs = new Array();
        var counter = 0;
        for (uid in data) {
            redis.hget('users:' + data[uid], 'nickname', function (err, nickname) {
                if (!nickname) return;
                objs.push({uid: data[uid], nickname: nickname});
                if (++counter == data.length) {
                    callback(objs);
                }
            });
        }
    });
}

function getActivityById(activityid, callback) {
    redis.hgetall('activities:' + activityid, function (err, activity) {
        console.log('Get activity by id:' + activityid);
        if (!activity) {
            db.activities.findOne({_id: db.ObjectId(activityid)},
                function (err, activity) {
                    callback(activity);
                });
        } else {
            callback({});
        }
    });
}

function findActivityByCreator(callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) callback({});
        console.log('find activity by creator:' + uid);
        redis.smembers('activities_createdby:' + uid, function (err, data) {
            if (!data) callback({});
            console.log('activities_createdby data: ' + data);
            var objs = new Array();
            var counter = 0;
            for (aid in data) {
                console.log('activities_createdby obj: ' + data[aid]);
                db.activities.findOne({_id: db.ObjectId(data[aid])}, function (err, activity) {
                    if (!activity) return;
                    delete activity['null'];
                    objs.push(activity);
                    if (++counter == data.length) {
                        callback(objs);
                    }
                });
            }
        });
    });    
}

function findActivityByParticipant(callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) callback({});
        console.log('find activity by participants:' + uid);
        redis.smembers('activities_participate:' + uid, function (err, data) {
            if (!data) callback({});
            var objs = new Array();
            var counter = 0;
            for (aid in data) {
                db.activities.findOne({_id: db.ObjectId(data[aid])}, function (err, activity) {
                    if (!activity) return;
                    delete activity['null'];
                    objs.push(activity);
                    if (++counter == data.length) {
                        callback(objs);
                    }
                });
            }
        });
    });
}

// data includes: ordertype.
function findActivityByLocation(callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) callback({});
        redis.get('location:' + uid, function (err, location) {
            if (!location) {
                callback([]);
                return;
            }
            db.executeDbCommand({
                geoNear:            'activities',
                near:               eval(location),
                spherical:          true,
                maxDistance:        1000 / 6371,
                distanceMultiplier: 6371000
            }, function (err, obj) {
                var data = new Array();
                obj.documents[0].results.forEach(function (result) {
                    if (result.obj._id == uid) return;
                    var obj = result.obj;
                    obj.dis = result.dis.toFixed(0)+'m';
                    delete obj['null'];
                    data.push(obj);
                });
                callback(data);
                console.log('user ' + uid + ' found closest activities.');
            });
        });
    });
}

function sendActivityInvatation(callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) callback({err: 1, msg: ''});
    });
}
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
        getActivityById:            getActivityById,
        findActivityByTitle:        findActivityByTitle,
        findActivityByLocation:     findActivityByLocation,
        findActivityByCreator:      findActivityByCreator,
        findActivityByParticipants: findActivityByParticipants
    };
}

function addActivity(activity, callback) {
    socket = this;
    console.log('add activity');
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
                callback({err: 0, msg: '添加活动成功'});
                redis.set('activity_location:' + activity._id,
                    '[' + activity.mark.longitude + ',' + activity.mark.longitude + ']');
                redis.sadd('activities_createdby:' + uid, activity._id);
            }
        });
    });
}

function removeActivity(activityid, callback) {
    socket = this;
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

function updateActivityDetails(activity) {
    socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.hget('activities:' + activity._id, 'creator_id', function(err, cid) {
            if (uid != cid) return;
            // set in mongo
            db.activities.update({'_id': db.ObjectId(activity._id)}, {$set: activity});
            // set in redis
            for (key in activity)
                redis.hset('activities:' + activity._id, key, activity[key]);
        });
    });
}

function participateActivity(activityid) {
    socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.sadd('activity_participants:' + activityid, uid);
        redis.sadd('activities_participate:' + uid, activityid)
        console.log('activity participate:' + activityid + '|' + uid);
    });
}

function unparticipateActivity(activityid) {
    socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.srem('activity_participants:' + activityid, uid);
        redis.srem('activities_participate:' + uid, activityid)
        console.log('activity unparticipate:' + activityid + '|' + activity.name + '|' + uid);
    });
}

function getActivityById(activityid, callback) {
    redis.hgetall('activities:' + activityid, function (err, activity) {
        if (!activity) {
            db.activities.find({_id: db.ObjectId(activityid)},
                function (err, activity) {
                    callback(activity);
                });
        } else {
            callback(activity);
        }
    });
}

function findActivityByCreator(uid, callback) {
    
}

function findActivityByParticipants(uid, callback) {

}

// data includes: title, ordertype.
function findActivityByTitle(data, callback) {
    
}

// data includes: ordertype.
function findActivityByLocation(data, callback) {
    
}
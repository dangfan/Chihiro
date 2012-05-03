var redis, clients, socket;

exports.init = function(_redis, _clients, _socket) {
    redis    = _redis;
    clients  = _clients;
    socket   = _socket;
    return {
        sendMessage:    sendMessage
    };
}

// send text message to a user
// TODO: offline messages
function sendMessage(data) {
    socket.get('uid', function (err, uid) {
        var date = new Date();
        redis.hgetall('users:' + uid, function (err, usr) {
            clients[data.uid].emit('messages', 
                from: uid,
                nickname: usr.nickname;
                time: date,
                message: data.msg
            });
        });

        redis.sadd('oldmessages:' + data.uid, uid + '|' + date + '|' + data.msg);
        console.log('message to:' + data.uid, uid + '|' + date + '|' + data.msg);
    });
}

// Create a topic with members
function createTopic(data, callback) {
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        if (!data.title || !data.members) return;
        redis.incr('topics_id', function (err, id){
            redis.set('topics:' + id + ':title', topic.title);
            redis.sadd('topics:' + id + ':members', topic.members);
            for (iuid in topic.members) redis.sadd('user_topics:' + iuid, id);
            callback({err: 0, id: id});
            console.log('new topic ' + topic.title + ' is created.');
        });
    });
}

// Get a topic information
function getTopicInfo(id, callback) {
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.get('topics:' + id + ':title', function (err, title) {
            if (title) callback({err:0, title: title});
            else callback({err:1, msg: '未找到该讨论组'});
        });
    });
}

// Subscribe a topic
function subscribeTopic(id) {
    socket.get('uid', function (err, uid) {
        redis.sadd('topics:' + id + ':members', uid);
        redis.sadd('user_topics:' + uid, id);  
    });
}

function sendTopicMessage(data, callback) {
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.publish('topic:' + data.id, JSON.stringify({uid: uid, msg: data.message}));
    });
}

function setSubscription(uid) {
    redis.smembers('user_topics:' + uid, function (err, topics) {
        for (id in topics) {
            redis.subscribe('topic:' + id);
        }
    });
}
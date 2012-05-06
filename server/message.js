var redis, clients;

exports.init = function(_redis, _clients) {
    redis    = _redis;
    clients  = _clients;
    return {
        sendMessage:      sendMessage,
        createTopic:      createTopic,
        getTopicInfo:     getTopicInfo,
        subscribeTopic:   subscribeTopic,
        sendTopicMessage: sendTopicMessage
    };
}

// send text message to a user
// TODO: offline messages
function sendMessage(data) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        var date = new Date();
        redis.hget('users:' + uid, 'nickname', function (err, nickname) {
            if (!nickname) return;
            if (data.uid in clients) {
                clients[data.uid].emit('messages', {
                    from: uid,
                    nickname: nickname,
                    time: date,
                    message: data.msg
                });
                console.log('message to:' + data.uid, nickname + '|' + uid + '|' + date + '|' + data.msg);
            } else {
                redis.sadd('messages:' + data.uid, uid + '|' + date + '|' + data.msg);                
                console.log('offline message to:' + data.uid, nickname + '|' + uid + '|' + date + '|' + data.msg);
            }
        });
    });
}

// Create a topic with members
function createTopic(data, callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        if (!data.title || !data.members || !data.intro) return;
        redis.incr('topics_id', function (err, id){
            redis.set('topics:' + id + ':title', data.title);
            redis.set('topics:' + id + ':intro', data.intro);
            redis.sadd('topics:' + id + ':members', data.members);
            for (iuid in data.members)
                redis.sadd('user_topics:' + data.members[iuid], id);
            callback({err: 0, id: id});
            console.log('new topic ' + topic.title + ' is created.');
        });
    });
}

// Get a topic information
function getTopicInfo(id, callback) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.get('topics:' + id + ':title', function (err, title) {
            if (title) {
                redis.get('topics:' + id + ':intro', function (err, intro) {
                    callback({err: 0, title: title, intro: intro});
                });
            }
            else callback({err:1, msg: '未找到该讨论组'});
        });
    });
}

// Subscribe a topic
function subscribeTopic(id) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        redis.sadd('topics:' + id + ':members', uid);
        redis.sadd('user_topics:' + uid, id);  
    });
}

function sendTopicMessage(data) {
    var socket = this;
    socket.get('uid', function (err, uid) {
        if (!uid) return;
        redis.publish('topic:' + data.id, JSON.stringify({uid: uid, msg: data.message}));
    });
}

function draw(data) {
    redis.publish('draw:' + data.id, JSON.stringify([data.px, data.py, data.x, data.y]));
}
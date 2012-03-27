var redis, clients, socket;

exports.init = function(_redis, _clients, _socket) {
    redis    = _redis;
    clients  = _clients;
    socket   = _socket;
    return {
    };
}

// send text message to a user
function sendMessage(data) {
    socket.get('uid', function (err, uid) {
        redis.sadd('messages:' + uid + ':' + data.uid, new Date() + '|' + data.msg);
        emitMessages(data.uid);
    })
}

function emitMessages(uid) {
    redis.keys('messages:*:' + uid, function (err, keys) {
        for (key in keys) {
            redis.smembers(key, function (err, messages) {
                socket.emit('messages', {
                    from: key.split(':')[1],
                    messages: messages
                });
            });
        }
    });
}

// Subscribe a topic
function subscribeTopic(topic) {
    socket.get('uid', function (err, uid) {
        redis.sadd('topic:' + topic + ':' + 'subscriber', uid);  
    });
}
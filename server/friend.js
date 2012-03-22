var db,
    redis,
    clients,
    socket;

exports.init = function(_db, _redis, _clients, _socket) {
    db      = _db;
    redis   = _redis;
    clients = _clients;
    socket  = _socket;
    return {
        sendFriendRequest:   sendFriendRequest
    };
}

// send a request to another user
function sendFriendRequest(desUsrId) {
    socket.get('sid', function (err, sid) {
        redis.get('sid:' + sid, function (err, usrId) {
            redis.sadd('friendRequests:' + desUsrId, usrId);
        });
    });
}
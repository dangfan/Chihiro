Ext.define('Chihiro.controller.Home', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            homeView: '#homeView'
        },
        control: {
            homeView: {
                activate: 'listening'
            }
        }
    },

    listening: function() {
        this.locateGeo();

        socket.on('friend request', function(user) {
            console.log(user);

            var chattinglists = Ext.getCmp('ChattingFriends');
            var myChattingFriend = chattinglists.getData();
            var newuser = [user];
            for(i=0; i < myChattingFriend.length;i++){
                newuser.push(myChattingFriend[i]);
            }
            //myChattingFriend.push(newuser);

            chattinglists.setData([]);
            var store = chattinglists.getStore();
            store.load();
            chattinglists.setData(newuser);
            //console.log(myChattingFriend);
        });

        socket.on('messages', function(msg) {
            console.log(msg);
            Ext.getCmp('ChattingContent').setData([
                {
                    id: msg.from,
                    image:'',
                    nickname:msg.nickname,
                    xindex:'1',
                    message:msg.message,
                    time:msg.time
                }]);

            var scroller = Ext.getCmp('ChattingContent').getScrollable();
            scroller.getScroller().scrollToEnd();
        });

        socket.on('friend confirmed', function(obj) {
            friendList.push(obj.uid);
            //TODO: 等待乾坤的addFriend接口
        });
    },

    locateGeo: function() {
        Ext.create('Ext.util.Geolocation', {
            autoUpdate: true,
            frequency: 300000,
            listeners: {
                locationupdate: function(geo) {
                    socket.emit('update location', {
                        longitude: geo.getLongitude(),
                        latitude: geo.getLatitude()
                    });
                }
            }
        })
    }
});
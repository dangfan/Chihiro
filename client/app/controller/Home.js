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

            //获取当前时间，应该写成一个函数
            var now = new Date();
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var clock = '';
            if(month < 10)
                clock += "0";
            clock += month + "-";
            if(day < 10)
                clock += "0";
            clock += day + " ";
            if(hh < 10)
                clock += "0";
            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm;
            user.lastmsg = user.nickname + "想加您为好友！";
            user.lasttime = clock;
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
            Ext.getCmp('friendlist').setData([]);
            var store = Ext.getCmp('friendlist').getStore();
            store.load();
            Ext.getCmp('friendlist').setData(friendList);
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
					myLocation=geo;
                }
            }
        })
    }

});
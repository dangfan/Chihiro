function getCurrentTime()
{
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
    return clock;
}

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

            var clock = getCurrentTime();
            user.lastmsg = user.nickname + "想加您为好友！回复任意内容即可确认";
            user.lasttime = clock;
            console.log(user);

            var chattinglists = Ext.getCmp('ChattingFriends');
            var myChattingFriend = chattinglists.getData();
            var newuser = [user];
            if(myChattingFriend)
                for(i=0; i < myChattingFriend.length;i++){
                    newuser.push(myChattingFriend[i]);
                }

            chattinglists.setData([]);
            var store = chattinglists.getStore();
            store.load();
            chattinglists.setData(newuser);
        });

        socket.on('messages', function(msg) {
            console.log(msg);

            var chattinglists = Ext.getCmp('ChattingFriends');
            var myChattingFriend = chattinglists.getData();
            if(msg.from === chattingID){
                var ChattingRecord = Ext.getCmp('ChattingContent').getData();
                ChattingRecord.push(
                    {
                        id: msg.from,
                        image:'',
                        nickname:msg.nickname,
                        xindex:'1',
                        message:msg.message,
                        time:msg.time
                    });
                Ext.getCmp('ChattingContent').setData([]);
                var store = Ext.getCmp('ChattingContent').getStore();
                store.load();
                Ext.getCmp('ChattingContent').setData(ChattingRecord);

                var scroller = Ext.getCmp('ChattingContent').getScrollable();
                scroller.getScroller().scrollToEnd();
            }
            else{
                console.log(msg.from + '!='+ chattingID);

                if(!friendList)
                    return;
                for(var i = 0; i < friendList.length;i++)
                {
                    if(friendList[i]._id === msg.from) {
                        friendList[i].lastmsg = msg.message;
                        friendList[i].lasttime = msg.time;
                    }
                }

                Ext.getCmp('ChattingFriends').setData([]);
                var store = Ext.getCmp('ChattingFriends').getStore();
                store.load();
                Ext.getCmp('ChattingFriends').setData(friendList);
            }
        });


        socket.on('friend confirmed', function(obj) {
            friendList.push(obj.uid);
            console.log(obj);
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
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
        locateGeo();

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
            var chattinglists = Ext.getCmp('ChattingFriends');
            var myChattingFriend = chattinglists.getData();
            if(msg.from === chattingID){
                var ChattingRecord = Ext.getCmp('ChattingContent').getData();
                ChattingRecord.push(
                    {
                        id: '',
                        image:'',
                        nickname:msg.nickname,
                        xindex:'1',
                        message:msg.message,
                        time:msg.time
                    });
                console.log(msg.message);
                Ext.getCmp('ChattingContent').setData([]);
                if(Ext.getCmp('homeView').getActiveItem().title != '聊天') Ext.getCmp('messagetab').tab.setBadgeText(++unreadMsg);

                var store = Ext.getCmp('ChattingContent').getStore();
                store.load();
                Ext.getCmp('ChattingContent').setData(ChattingRecord);

                var scroller = Ext.getCmp('ChattingContent').getScrollable();
                scroller.getScroller().scrollToEnd();
            }
            else{
                console.log(msg.from + '!='+ chattingID);
                if(Ext.getCmp('homeView').getActiveItem().title != '聊天') Ext.getCmp('messagetab').tab.setBadgeText(++unreadMsg);
                if(!friendList)
                    return;
                console.log(friendList);
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

        socket.on('topic', function(msg) {
            var chattinglists = Ext.getCmp('ChattingGroups');
            var myChattingGroup = chattinglists.getData();

            if(msg.uid === sid)
                return;

            if(msg.tid === chattingID){
                var ChattingRecord = Ext.getCmp('GroupChattingContent').getData();
                ChattingRecord.push(
                    {
                        id: '',
                        image:'',
                        nickname:msg.nickname,
                        xindex:'1',
                        message:msg.msg,
                        time:''
                    });
                Ext.getCmp('GroupChattingContent').setData([]);
                if(Ext.getCmp('homeView').getActiveItem().title != '聊天') Ext.getCmp('messagetab').tab.setBadgeText(++unreadMsg);

                var store = Ext.getCmp('GroupChattingContent').getStore();
                store.load();
                Ext.getCmp('GroupChattingContent').setData(ChattingRecord);

                var scroller = Ext.getCmp('GroupChattingContent').getScrollable();
                scroller.getScroller().scrollToEnd();
            }
            else{
                console.log(myChattingGroup);
                if(Ext.getCmp('homeView').getActiveItem().title != '聊天') Ext.getCmp('messagetab').tab.setBadgeText(++unreadMsg);
                if(!myChattingGroup)
                    return;
                for(var i = 0; i < myChattingGroup.length;i++)
                {
                    if(myChattingGroup[i].id === msg.tid) {
                        myChattingGroup[i].lastmsg = msg.msg;
                        myChattingGroup[i].lasttime = msg.time;
                    }
                }

                Ext.getCmp('ChattingGroups').setData([]);
                var store = Ext.getCmp('ChattingGroups').getStore();
                store.load();
                Ext.getCmp('ChattingGroups').setData(myChattingGroup);
            }
        });


        socket.on('friend confirmed', function(obj) {
            addFriendAndShow(obj.uid);
        });
        socket.on('recommend activity', function(obj){
            console.log(obj);
            alert("Sb recommend an activity");
        });
        socket.on('recommend by interests', function(id) {
            socket.emit('get info by id',id,function(msg) {
                console.log(msg.obj);
                alert("Sb recommend a friend");
            });
        })
    }
});
function locateGeo() {
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
};
function addFriendAndShow(uid)
{
    friendList.push(uid);
    Ext.getCmp('friendlist').setData([]);
    var store = Ext.getCmp('friendlist').getStore();
    store.load();
    Ext.getCmp('friendlist').setData(friendList);
}
Ext.define('Chihiro.controller.message.Friend', {
    extend: 'Ext.app.Controller',
    profile: Ext.os.deviceType.toLowerCase(),

    config: {
        refs: {
            deletebutton: '#deleteButton',
            msgbutton: '#msgSendButton',
            msgtextfield:'#MessageTextField',
            friendimage:'#FriendImage'
        },
        control: {
            deletebutton: {
                tap: 'EndConversation'
            },
            msgbutton: {
                tap: 'Send'
            },
            friendimage:{
                tap:'ShowActions'
            }
        }
    },


    EndConversation: function(view, index, target, record) {
        chattingID = '0';

        var me = Ext.getCmp('ChattingContent');
        var store = me.getStore();
        store.load();

        var button = this.getDeletebutton();
        var a = button.parent.parent;
        a.hide();

        if(Ext.getCmp('ChattingFriends')){
            Ext.getCmp('ChattingFriends').deselectAll();
        }

        if(Ext.getCmp('ChattingGroups')){
            Ext.getCmp('ChattingGroups').deselectAll();
        }
    },


    Send: function(view, index, target, record) {
        var msgtextfield = this.getMsgtextfield();
        var msg = msgtextfield.getValue();
        var time = getCurrentTime();

        if(msg != '')
        {
            msgtextfield.reset();
            //console.log(ChattingRecord);
            var ChattingRecord = Ext.getCmp('ChattingContent').getData();
            ChattingRecord.push(
                {
                    id: '',
                    image:'',
                    nickname:sname,
                    xindex:'0',
                    message:msg,
                    time:time
                });
            Ext.getCmp('ChattingContent').setData([]);
            var store = Ext.getCmp('ChattingContent').getStore();
            store.load();
            Ext.getCmp('ChattingContent').setData(ChattingRecord);

            var scroller = Ext.getCmp('ChattingContent').getScrollable();
            scroller.getScroller().scrollToEnd();
        }

        var scroller = Ext.getCmp('ChattingContent').getScrollable();
        scroller.getScroller().scrollToEnd();

        var uid = Ext.getCmp('ChattingFriends').getSelection()[0].raw._id;

        //检查好友列表，若有该人，则发送送消息；否则发送接收好友请求
        for(var i = 0; i < friendList.length;i++)
        {
            if(friendList[i]._id === uid) {
                socket.emit('send message',{uid:uid,msg:msg,time:time});
                console.log({uid:uid,msg:msg,time:time});
                return;
            }
        }
        socket.emit('add friend',uid, function(result) {
            if(result.err) aleart('添加好友失败了:(');
            else {
                alert('但愿添加好友成功');
                newfriend = Ext.getCmp('ChattingFriends').getSelection()[0].raw;
                friendList.push(newfriend);
            }
            //TODO: 等待乾坤的addfriend接口
        });

//        console.log(friendList);
    },

    ShowActions:function(img,obj,other){

        if(chatobject === 'friend')
        {
            if(Ext.getCmp('MyCarousel'))
            {
                var carou = Ext.getCmp('MyCarousel');
                carou.setActiveItem(0);

                Ext.getCmp('addFriendBtn').setHidden(true);
                Ext.getCmp('deleteFriendBtn').setHidden(true);
                Ext.getCmp('talktofriendBtn').setHidden(true);

                var user = Ext.getCmp('ChattingFriends').getSelection()[0];
                information = Ext.getCmp('DetailPanel').down('detailInformation');
                information.setData(user.data);

                var button = this.getDeletebutton();
                var a = button.parent.parent;
                a.hide();

                Ext.getCmp('DetailPanel').show();
                return;
            }

            if (!this.view) {
                this.view = Ext.create('Chihiro.view.userlist.Detail');
            }
            Ext.getCmp('addFriendBtn').setHidden(true);
            Ext.getCmp('deleteFriendBtn').setHidden(true);
            Ext.getCmp('talktofriendBtn').setHidden(true);

            var view = this.view;
            var user = Ext.getCmp('ChattingFriends').getSelection()[0];
            view.setUser(user);

            if (!view.getParent()) {
                Ext.Viewport.add(view);
            }

            var button = this.getDeletebutton();
            var a = button.parent.parent;
            a.hide();

            view.show();
        }
    }
});

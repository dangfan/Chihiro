Ext.define('Chihiro.controller.message.ChatList', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            chatList: 'chatlist',
            groupList:'grouplist',
            panel:'friends',
            groupinfopanle:'#groupInfoPanel',
            myimage:'#MyImage'
        },

        control: {
            'chatlist': {
                select: 'onChatListTap'
            },
            'grouplist':{
                select: 'onGroupListTap'
            },
            'friends': {
                hideanimationstart: 'onFriendsHideAnimationStart'
            },
            myimage:{
                tap:'GotoSetting'
            }
        }
    },

    init: function() {

    },

    launch: function(){

        socket.emit('find closest', function(list) {
            Ext.getCmp('ChattingFriends').setData(list);
        });
    },

    onChatListTap: function(list, user) {
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.message.Friends');
        }

        Ext.getCmp('ChattingContent').setData([
            {
                id: "407788",
                nickname:"程序猿",
                xindex:'1',
                message:'Hello!这是好友聊天的测试消息!',
                time:"4月12日 下午17:55"
            }]);

        var view = this.view;
        Ext.getCmp('FriendImage').setSrc(user.data.portrait);
        var a = user.data.nickname;
        var b = user.data.signiture;
        Ext.getCmp('friendInfoPanel').setHtml('<span class="nickname"><b>'+a+'</b></span><br />' +
            '<p style="font-size: 12px"><b>'+b+'</b></p>');

        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        chatobject = 'friend';

        view.show();
    },

    onGroupListTap: function(list, user) {
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.message.Friends');
        }

        var me = Ext.getCmp('ChattingContent');
        var store = me.getStore();
        store.load();

        Ext.getCmp('ChattingContent').setData([
            {
                id: "407788",
                nickname:"程序猿",
                xindex:'1',
                message:'Hello!这是群组聊天的测试消息!',
                time:"4月12日 下午17:55"
            }]);

        var view = this.view;
        view.setUser(user);
        Ext.getCmp('FriendImage').setSrc(user.data.portrait);
        var a = user.data.nickname;
        var b = user.data.announcement;
        Ext.getCmp('friendInfoPanel').setHtml('<span class="nickname"><b>'+a+'</b></span><br />' +
            '<p style="font-size: 12px"><b>'+b+'</b></p>');

        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        chatobject = 'group';

        view.show();
    },

    onFriendsHideAnimationStart: function() {
        this.getChatList().deselectAll();
    },

    GotoSetting:function(img,obj,other){

        Ext.getCmp('homeView').setActiveItem(4);
    }
});

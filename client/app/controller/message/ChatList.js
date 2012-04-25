Ext.define('Chihiro.controller.message.ChatList', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            chatList: 'chatlist',
            groupList:'grouplist'
        },

        control: {
            'chatlist': {
                select: 'onListTap'
            },
            'grouplist':{
                select: 'onListTap'
            },
            'friends': {
                hideanimationstart: 'onFriendsHideAnimationStart'
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

    onListTap: function(list, user) {
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.message.Friends');
            Ext.getCmp('ChattingContent').setData([
                {
                    id: "407788",
                    nickname:"党熊",
                    xindex:'0',
                    message:'Hello! I am a bear!',
                    time:"4月12日 下午17:55"
                },
                {
                    id: "407789",
                    nickname:"我叫党主席",
                    xindex:"1",
                    message:'Yes! You are a bear!',
                    time:"4月12日 下午17:56"
                },{
                    id: "407790",
                    nickname:"党熊",
                    xindex:'0',
                    message:'Oh yeah! I am a bear!',
                    time:"4月12日 下午17:57"
                },
                {
                    id: "407791",
                    nickname:"我叫党主席",
                    xindex:"1",
                    message:'Congratulations! You are a bear!',
                    time:"4月12日 下午17:58"
                }]);
            //alert( Ext.getCmp('ChattingFriends').getSelection()[0].raw._id);
        }

        var view = this.view;
        view.setUser(user);

        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        view.show();
    },

    onFriendsHideAnimationStart: function() {
        this.getChatList().deselectAll();
    }
});

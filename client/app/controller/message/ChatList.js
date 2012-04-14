Ext.define('Chihiro.controller.message.ChatList', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            chatList: 'chatlist'
        },

        control: {
            'chatlist': {
                select: 'onListTap'
            },
            'friends': {
                hideanimationstart: 'onFriendsHideAnimationStart'
            }
        }
    },

    init: function() {

    },

    onListTap: function(list, user) {
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.message.Friends');
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

Ext.define('Chihiro.controller.List', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            userList: 'userlist',
            searchField: 'searchfield',
            refreshButton: 'button[iconCls=refresh]',
            addFriendBtn: '#addFriendBtn'
        },

        control: {
            'userlist': {
                select: 'onListTap'
            },
            'detail': {
                hideanimationstart: 'onDetailHideAnimationStart'
            },
            'searchfield': {
                action: 'onSearch'
            },
            'addFriendBtn': {
                tap: 'addFriend'
            }
        }
    },

    init: function() {

    },
    addFriend: function() {
        socket.emit('send friend request',this.getUserList().getSelection()[0].raw._id);
        alert("好友申请已经发送");
        //TODO: Will need callback msg indicating whether this person is already a friend
    },
    onListTap: function(list, user) {
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.userlist.Detail');
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

    onSearch: function(field) {
        this.doFilter({
            q: field.getValue()
        });
    },

    onDetailHideAnimationStart: function() {
        this.getUserList().deselectAll();
    }
});

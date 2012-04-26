Ext.define('Chihiro.controller.List', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            userList: 'userlist',
            searchField: 'searchfield',
            refreshButton: 'button[iconCls=refresh]',
            addFriendBtn: '#addFriendBtn',
            deleteFriendBtn: '#deleteFriendBtn'
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
            },
            'deleteFriendBtn': {
                tap: 'deleteFriend'
            }
        }
    },

    init: function() {

    },
    addFriend: function() {
        socket.emit('send friend request',Ext.getCmp('userlist').getSelection()[0].raw._id);
        console.log(Ext.getCmp('userlist').getSelection()[0].raw._id);
        alert("好友申请已经发送");
        //TODO: Will need callback msg indicating whether this person is already a friend
    },
    deleteFriend: function() {
        //socket.emit('send friend request',Ext.getCmp('userlist').getSelection()[0].raw._id);
        var friendId = Ext.getCmp('friendlist').getSelection()[0].raw._id;
        var i;
        for(i=0;friendList[i]._id!=friendId;i++);
        friendList.splice(i,1);
        Ext.getCmp('friendlist').setData(friendList);
        //console.log(Ext.getCmp('friendlist').getStore());
        //window.localStorage.setItem('friends', friendList);
        //console.log(window.localStorage);
        //console.log(Ext.getCmp('friendlist').store);
        //Ext.getCmp('friendlist').store.load();
        var store=Ext.create('Ext.data.Store',{
            model: 'Chihiro.model.User'
        });
        store.setData(friendList);
        store.sync();
        //store.load();
        console.log(store);
        console.log(window.localStorage);
    },
    onListTap: function(list, user) {
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.userlist.Detail');
        }
        if(Ext.getCmp('homeView').getActiveItem().title=='通讯录'){
            Ext.getCmp('addFriendBtn').setHidden(true);
            Ext.getCmp('deleteFriendBtn').setHidden(false);
            Ext.getCmp('talktofriendBtn').setHidden(false);
        }else if(Ext.getCmp('homeView').getActiveItem().title=='找朋友'){
            Ext.getCmp('addFriendBtn').setHidden(false);
            Ext.getCmp('deleteFriendBtn').setHidden(true);
            Ext.getCmp('talktofriendBtn').setHidden(true);
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
        if(Ext.getCmp('friendlist')){
            Ext.getCmp('friendlist').deselectAll();
        }
        if(Ext.getCmp('userlist')){
            Ext.getCmp('userlist').deselectAll();
        }
    }
});

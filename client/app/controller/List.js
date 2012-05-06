Ext.define('Chihiro.controller.List', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            userList: 'userlist',
            searchField: 'searchfield',
            refreshButton: 'button[iconCls=refresh]',
            addFriendBtn: '#addFriendBtn',
            deleteFriendBtn: '#deleteFriendBtn',
            simplelist:'#SimpleFriendList'
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
            },
            'simplelist':{
                select:'selectSomebody',
                deselect:'remainCss',
                itemdoubletap:'doubleTap'
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
        socket.emit('remove friend',Ext.getCmp('friendlist').getSelection()[0].raw._id);

        var friendId = Ext.getCmp('friendlist').getSelection()[0].raw._id;
        var i;
        for(i=0;friendList[i]._id!=friendId;i++);
        friendList.splice(i,1);

        Ext.getCmp('friendlist').setData([]);
        var store = Ext.getCmp('friendlist').getStore();
        store.load();
        Ext.getCmp('friendlist').setData(friendList);
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
    },

    selectSomebody:function(a,record){


        invitationList.push(record.data);

        console.log(invitationList);
    },

    remainCss: function(me, record) {
        var ln = invitationList.length;

        for(var i = 0; i < ln; i++)
        {
            if(invitationList[i] === record.data)
            {
                invitationList.pop(record.data);
                console.log(invitationList);
                return;
            }
        }
    },

    doubleTap: function(me, index, target, record,  e, eOpts){
        var item = me.container.getViewItems()[me.getStore().indexOf(record)];
        if (Ext.isElement(item)) {
            item = Ext.get(item);
        }
        if (item) {
            item.removeCls([me.getPressedCls(), me.getSelectedCls()]);
        }
    }
});

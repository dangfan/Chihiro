var addFriendID;
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
            simpleFriendlist:'#SimpleFriendList2',
            MyList:'#SimpleFriendList',
            invitaionList:"#InvitationList",
            invitationListForActivity: "#invitecandidatelist",
            simplegrouplist:"#SimpleGroupList"
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
            'simpleFriendlist':{
                select:'selectSomebody',
                deselect:'remainCss',
                itemdoubletap:'doubleTap'
            },
            'MyList':{
                select:'onMyListTap'
            },
            'invitaionList':{
                select:'selectSomebodyToInvite',
                deselect:'remainCssToInvite',
                itemdoubletap:'doubleTap'
            },
            'invitationListForActivity':{
                select:'selectSomebodyToInviteForActivity',
                deselect:'remainCssToInviteForActivity',
                itemdoubletap:'doubleTapForActivity'
            },
            'simplegrouplist':{
                select:'selectSomegroupToInvite',
                deselect:'remainCssToGroup',
                itemdoubletap:'doubleTap'
            },
            'button[action=InviteFriendsToOneGroup]': {
                tap: 'InviteFriendsToOneGroup'
            },
            'button[action=InviteOneFriendToGroups]': {
                tap: 'InviteOneFriendToGroups'
            },
            'button[action=QuitGroup]': {
                tap: 'QuitGroup'
            }
        }
    },

    init: function() {

    },

    addFriend: function() {
        var uid;
        if(addFriendID != null) uid = addFriendID;
        else uid = Ext.getCmp('userlist').getSelection()[0].raw._id;
        console.log(uid);
        console.log(friendList);
        var i;
        for(i = 0; i < friendList.length && friendList[i]._id != uid;i++);

        if(i < friendList.length) alert("该用户已经是您的好友了！");
        else {
                socket.emit('send friend request',uid);
                console.log(Ext.getCmp('userlist').getSelection()[0].raw._id);
                alert("好友申请已经发送");
        }
        addFriendID = null;
    },

    deleteFriend: function() {
        socket.emit('remove friend',Ext.getCmp('SimpleFriendList').getSelection()[0].raw._id);

        var friendId = Ext.getCmp('SimpleFriendList').getSelection()[0].raw._id;
        var i;
        for(i=0;friendList[i]._id!=friendId;i++);
        friendList.splice(i,1);

        Ext.getCmp('SimpleFriendList').setData([]);
        var store = Ext.getCmp('SimpleFriendList').getStore();
        store.load();

        socket.emit('get topic list',function(obj) {
            Ext.getCmp('SimpleFriendList').setData(obj);
        });
        Ext.getCmp('SimpleFriendList').setData(friendList);

    },

    onListTap: function(list, user) {
        console.log(user.data);
        if(user.data.birthday){
            var birthday = user.data.birthday.split('T');
            user.data.birthday = birthday[0];
        }
        if(Ext.getCmp('MyCarousel'))
        {
            var carou = Ext.getCmp('MyCarousel');
            carou.setActiveItem(0);
            if(Ext.getCmp('homeView').getActiveItem().title=='通讯录'){
                Ext.getCmp('addFriendBtn').setHidden(true);
                Ext.getCmp('deleteFriendBtn').setHidden(false);
            }else if(Ext.getCmp('homeView').getActiveItem().title=='找朋友'){
                Ext.getCmp('addFriendBtn').setHidden(false);
                Ext.getCmp('deleteFriendBtn').setHidden(true);
            }

            information = Ext.getCmp('DetailPanel').down('detailInformation');
            information.setData(user.data);
            Ext.getCmp('DetailPanel').show();
            return;
        }

        this.view = Ext.create('Chihiro.view.userlist.Detail');

        if(Ext.getCmp('homeView').getActiveItem().title=='通讯录'){
            Ext.getCmp('addFriendBtn').setHidden(true);
            Ext.getCmp('deleteFriendBtn').setHidden(false);
        }else if(Ext.getCmp('homeView').getActiveItem().title=='找朋友'){
            Ext.getCmp('addFriendBtn').setHidden(false);
            Ext.getCmp('deleteFriendBtn').setHidden(true);
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
        console.log(invitationList);
        invitationList.push(record.data._id);
    },

    selectSomebodyToInvite:function(a,record){
        console.log(record.raw._id);
        invitationList.push(record.raw._id);
    },
    selectSomebodyToInviteForActivity: function(a,record){
        console.log(record.raw._id);
        invitationListForActivity.push(record.raw._id);
    },
    selectSomegroupToInvite:function(a,record){
        invitationList.push(record.raw.id);
    },

    remainCss: function(me, record) {
        var ln = invitationList.length;

        for(var i = 0; i < ln; i++)
        {
            if(invitationList[i] === record.data._id)
            {
                invitationList.pop(record.data._id);
                console.log(invitationList);
                return;
            }
        }
    },

    remainCssToInvite: function(me, record) {
        var ln = invitationList.length;

        for(var i = 0; i < ln; i++)
        {
            if(invitationList[i] === record.raw._id)
            {
                invitationList.pop(record.raw._id);
                console.log(invitationList);
                return;
            }
        }
    },

    remainCssToInviteForActivity: function(me, record){
        var ln = invitationListForActivity.length;

        for(var i = 0; i < ln; i++)
        {
            if(invitationListForActivity[i] === record.raw._id)
            {
                invitationListForActivity.pop(record.raw._id);
                console.log(invitationListForActivity);
                return;
            }
        }
    },
    remainCssToGroup: function(me, record) {
        var ln = invitationList.length;

        for(var i = 0; i < ln; i++)
        {
            if(invitationList[i] === record.raw.id)
            {
                invitationList.pop(record.raw.id);
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
    },

    doubleTapForActivity: function(me, index, target, record, e, eOpts){
        var item = me.container.getViewItems()[me.getStore().indexOf(record)];
        if (Ext.isElement(item)) {
            item = Ext.get(item);
        }
        if (item) {
            item.removeCls([me.getPressedCls(), me.getSelectedCls()]);
        }
    },
    onMyListTap: function(list, user) {

        var flag = 'group';
        if(friendList){
            for(i=0; i < friendList.length;i++){
                if(friendList[i]._id === user.data._id)
                    flag = 'friend';
            }
        }

        if(flag === 'friend')
        {
            if(user.data.birthday){
                var birthday = user.data.birthday.split('T');
                user.data.birthday = birthday[0];
            }
            if(user.data.interests){
                var interestString = user.data.interests;
                console.log(interestString);
                interestString = interestString.replace(/"([^"]*)"/g, "$1");
                if(interestString.indexOf("[") >= 0)
                    interestString = interestString.slice(1,interestString.length-1);
                user.data.interests = interestString;
            }

            if(Ext.getCmp('MyCarousel'))
            {
                var carou = Ext.getCmp('MyCarousel');
                carou.setActiveItem(0);
                Ext.getCmp('addFriendBtn').setHidden(true);
                Ext.getCmp('deleteFriendBtn').setHidden(false);

                information = Ext.getCmp('DetailPanel').down('detailInformation');
                information.setData(user.data);

                Ext.getCmp('DetailPanel').show();
                return;
            }

            this.view = Ext.create('Chihiro.view.userlist.Detail');

            Ext.getCmp('addFriendBtn').setHidden(true);
            Ext.getCmp('deleteFriendBtn').setHidden(false);

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
        }
        else{

            if(Ext.getCmp('GroupCarousel'))
            {
                var carou = Ext.getCmp('GroupCarousel');
                carou.setActiveItem(0);

                information = Ext.getCmp('GroupDetailPanel').down('groupDetailInformation');
                information.setData(user.data);

                Ext.getCmp('quitGroupBtn').setHidden(false);

                Ext.getCmp('GroupDetailPanel').show();

                return;
            }

            this.view = Ext.create('Chihiro.view.userlist.GroupDetail');
            Ext.getCmp('quitGroupBtn').setHidden(false);

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
            Ext.getCmp('GroupDetailPanel').show();
        }
    },

    InviteFriendsToOneGroup:function(){
        var groupId = Ext.getCmp('SimpleFriendList').getSelection()[0].raw.id
        console.log(groupId);
        socket.emit('add members',{id:groupId,members:invitationList});
        Ext.getCmp('SimpleFriendList').setData([]);
        var store = Ext.getCmp('SimpleFriendList').getStore();
        store.load();

        var grouplist;
        socket.emit('get topic list',function(obj) {
            Ext.getCmp('SimpleFriendList').setData(obj);
        });
        Ext.getCmp('SimpleFriendList').setData(friendList);

        if(invitationList.length > 0)
            alert("群组已加入新成员");
    },

    InviteOneFriendToGroups:function(){
        var uid = Ext.getCmp('SimpleFriendList').getSelection()[0].raw._id
        console.log(uid);
        console.log(invitationList);
        for(var i = 0; i < invitationList.length; i++){
            socket.emit('add members',{id:invitationList[i],members:[uid]});
        }

        Ext.getCmp('SimpleFriendList').setData([]);
        var store = Ext.getCmp('SimpleFriendList').getStore();
        store.load();
        var grouplist;
        socket.emit('get topic list',function(obj) {
            Ext.getCmp('SimpleFriendList').setData(obj);
        });
        Ext.getCmp('SimpleFriendList').setData(friendList);

        if(invitationList.length > 0)
            alert("已邀请该好友加入群组");
    },

    QuitGroup:function(){
        var groupId = Ext.getCmp('SimpleFriendList').getSelection()[0].raw.id
        console.log(groupId);
        socket.emit('quit topic',groupId);

        Ext.getCmp('SimpleFriendList').setData([]);
        var store = Ext.getCmp('SimpleFriendList').getStore();
        store.load();
        socket.emit('get topic list',function(obj) {
            Ext.getCmp('SimpleFriendList').setData(obj);
            console.log(obj);
        });
        Ext.getCmp('SimpleFriendList').setData(friendList);
        alert("已退出该群！");
    }
});

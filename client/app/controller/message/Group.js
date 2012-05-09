Ext.define('Chihiro.controller.message.Group',{
    extend: 'Ext.app.Controller',
    profile: Ext.os.deviceType.toLowerCase(),

    config: {
        refs: {
            deletebutton: '#groupDeleteButton',
            msgbutton: '#groupMsgSendButton',
            msgtextfield:'#GroupMessageTextField',
            groupimage:'#GroupImage',
            invitebuttom:'#GroupInviteBtn'
        },
        control: {
            deletebutton: {
                tap: 'EndConversation'
            },
            msgbutton: {
                tap: 'Send'
            },
            groupimage:{
                tap:'ShowActions'
            },
            'button[action=backToGroupList]': {
                tap: 'backToGroupList'
            },
            'button[action=createGroup]': {
                tap: 'createGroup'
            },
            invitebuttom:{
                tap:'inviteFriends'
            }
        }
    },

    launch: function(){

    },
    backToGroupList: function(){
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
    },

    createGroup: function(){
        var val = Ext.getCmp('creategroup').getValues();

        if(val.name.length == 0){
            Ext.Msg.alert('群组名不能为空');
            return;
        }
        else{
             if(!Ext.getCmp('SimpleFriendListPanel')){
                    Ext.create('Chihiro.view.userlist.SimpleFriendList',{
                        id: 'SimpleFriendListPanel'
                    });
             }
            invitationList = [];
            Ext.getCmp('SimpleFriendList2').setData([]);
            var store = Ext.getCmp('SimpleFriendList2').getStore();
            store.load();
            Ext.getCmp('SimpleFriendList2').setData(friendList);

            Ext.Viewport.setActiveItem(Ext.getCmp('SimpleFriendListPanel'));

        }

    },

    EndConversation: function(view, index, target, record) {
        chattingID = '0';

        var me = Ext.getCmp('GroupChattingContent');
        var store = me.getStore();
        store.load();

        var button = this.getDeletebutton();
        var a = button.parent.parent;
        a.hide();

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
            Ext.getCmp('GroupChattingContent').setData([
                {
                    id: '',
                    image:'',
                    nickname:"党熊",
                    xindex:'0',
                    message:msg,
                    time:time
                }]);

            var scroller = Ext.getCmp('GroupChattingContent').getScrollable();
            scroller.getScroller().scrollToEnd();
        }

        var scroller = Ext.getCmp('GroupChattingContent').getScrollable();
        scroller.getScroller().scrollToEnd();

        var uid = Ext.getCmp('ChattingGroups').getSelection()[0].raw.id;
        socket.emit('send topic message',{id:uid,msg:msg});
        console.log({id:uid,msg:msg});
//        var grouplist;
//        socket.emit('get topic list',function(obj) {
//            grouplist = obj;
//        });
    },

    ShowActions:function(img,obj,other){

        if(Ext.getCmp('GroupCarousel'))
        {
            var carou = Ext.getCmp('GroupCarousel');
            carou.setActiveItem(0);

            var group = Ext.getCmp('ChattingGroups').getSelection()[0];
            information = Ext.getCmp('GroupDetailPanel').down('groupDetailInformation');
            information.setData(group.data);
            Ext.getCmp('quitGroupBtn').setHidden(true);

            var button = this.getDeletebutton();
            var a = button.parent.parent;
            a.hide();

            Ext.getCmp('GroupDetailPanel').show();
            return;
        }

        if (!this.view) {
            this.view = Ext.create('Chihiro.view.userlist.GroupDetail');
        }

        Ext.getCmp('quitGroupBtn').setHidden(true);
        var view = this.view;
        var group = Ext.getCmp('ChattingGroups').getSelection()[0];
        view.setUser(group);

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        var button = this.getDeletebutton();
        var a = button.parent.parent;
        a.hide();

        view.show();
    },

    inviteFriends:function(){
        var val = Ext.getCmp('creategroup').getValues();
        console.log(val);
        console.log(invitationList);
        socket.emit('create topic',{nickname:val.name,intro:val.intro,members:invitationList},function(obj) {
            if(obj.err === 0)
                socket.emit('get topic list',function(obj) {
                    console.log(obj);
                    Ext.getCmp('ChattingGroups').setData([]);
                    var store = Ext.getCmp('ChattingGroups').getStore();
                    store.load();
                    Ext.getCmp('ChattingGroups').setData(obj);
                });
         });
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
        Ext.getCmp('creategroup').reset();
    }
})